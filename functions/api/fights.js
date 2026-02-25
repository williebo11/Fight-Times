export async function onRequestGet(context) {
  const RAPID_KEY      = context.env.RAPIDAPI_KEY;
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

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const sportradarHeaders = {
    "x-api-key": SPORTRADAR_KEY,
    "accept": "application/json",
  };

  const [boxingRes, ...mmaResponses] = await Promise.all([
    safeFetch(BOXING_API, {
      headers: {
        "X-RapidAPI-Key":  RAPID_KEY,
        "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
      },
    }),
    ...dates.map(date =>
      safeFetch(
        `https://api.sportradar.com/mma/trial/v2/en/schedules/${date}/schedule.json`,
        { headers: sportradarHeaders }
      )
    ),
  ]);

  // Read raw SportRadar responses for debug
  const mmaDebug = await Promise.all(
    mmaResponses.map(async (res, i) => {
      if (!res) return { date: dates[i], status: null, error: "no response" };
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch(e) { data = text; }
      return { date: dates[i], status: res.status, data };
    })
  );

  // Boxing
  let boxingData = [];
  if (boxingRes && boxingRes.ok) {
    try { boxingData = await boxingRes.json(); } catch(e) {}
  }

  return new Response(
    JSON.stringify({
      ufc: [],          // keeps frontend working
      boxing: boxingData,
      _debug: mmaDebug, // SportRadar raw — check /api/fights to see this
    }, null, 2),
    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
  );
}
