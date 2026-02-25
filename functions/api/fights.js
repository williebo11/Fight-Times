export async function onRequestGet(context) {
  const RAPID_KEY = context.env.RAPIDAPI_KEY;
  const SPORTRADAR_KEY = context.env.SPORTRADAR_KEY;

  const BOXING_API = "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7";

  async function safeFetch(url, options = {}, timeoutMs = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      return null;
    }
  }

  // Generate dates for today + next 6 days
  const dates = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dayStr = String(d.getDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${dayStr}`);
  }

  // Fetch MMA summaries for each date in parallel
  const mmaPromises = dates.map(date =>
    safeFetch(
      `https://api.sportradar.com/mma/trial/v2/en/schedules/${date}/summaries.json?api_key=${SPORTRADAR_KEY}`
    )
  );

  const [boxingRes, ...mmaResponses] = await Promise.all([
    safeFetch(BOXING_API, {
      headers: {
        "X-RapidAPI-Key": RAPID_KEY,
        "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
      },
    }),
    ...mmaPromises,
  ]);

  // Process MMA data
  let allSummaries = [];
  const mmaDebug = [];

  for (let i = 0; i < mmaResponses.length; i++) {
    const res = mmaResponses[i];
    const date = dates[i];
    if (!res) {
      mmaDebug.push({ date, error: "fetch failed" });
      continue;
    }
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (data?.summaries) {
        allSummaries = allSummaries.concat(data.summaries);
      }
      mmaDebug.push({ date, status: res.status, summariesCount: data?.summaries?.length || 0 });
    } catch (e) {
      mmaDebug.push({ date, error: "parse failed", raw: text.slice(0, 200) });
    }
  }

  // Filter for UFC events only + map to cleaner structure
  const ufcFights = allSummaries
    .filter(summary => 
      summary.sport_event?.sport_event_context?.category?.name === "UFC"
    )
    .map(summary => {
      const event = summary.sport_event || {};
      const status = summary.sport_event_status || {};
      const comps = event.competitors || [];
      const ctx = event.sport_event_context || {};
      const venue = event.venue || {};

      return {
        id: event.id,
        start_time: event.start_time,
        competition: ctx.competition?.name || "UFC Event",
        stage: ctx.stage?.type || "Unknown",
        fighters: comps.map(c => ({
          name: c.name,
          abbreviation: c.abbreviation,
          qualifier: c.qualifier,
          country: c.country || c.country_code,
        })),
        weight_class: status.weight_class || "N/A",
        status: status.status,
        match_status: status.match_status,
        title_fight: status.title_fight,
        main_event: status.main_event,
        venue: venue.name ? `${venue.name}, ${venue.city_name || ""}` : "TBD",
        // Add more fields if needed (channels, etc.)
      };
    });

  // Boxing data (keep raw for now – looks like array of events)
  let boxingData = [];
  if (boxingRes && boxingRes.ok) {
    try {
      boxingData = await boxingRes.json();
    } catch (e) {}
  }

  // Optional: group UFC fights by competition name / event if you want cleaner output
  // For now we return flat list

  return new Response(
    JSON.stringify({
      ufc: ufcFights,
      boxing: boxingData,
      count: {
        ufcFights: ufcFights.length,
        boxingEvents: boxingData.length,
      },
      _debug: {
        datesQueried: dates,
        mma: mmaDebug,
        boxingStatus: boxingRes?.status || "no response",
        sampleUfcUrl: dates[0] ? `https://api.sportradar.com/mma/trial/v2/en/schedules/${dates[0]}/summaries.json?api_key=REDACTED` : "",
      },
    }, null, 2),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
