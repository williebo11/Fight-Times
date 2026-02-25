export async function onRequestGet(context) {
  try {
    const RAPID_KEY = context.env.RAPIDAPI_KEY;
    // Optional: if you still want Sportradar fallback later, keep SPORTRADAR_KEY = context.env.SPORTRADAR_KEY;

    // ─── UFC / MMA via RapidAPI MMA API ───
    const MMA_API = "https://mmaapi.p.rapidapi.com/api/mma/unique-tournament/19906/tournament/114389/mma-events/all";

    // ─── Boxing ───
    const BOXING_API = "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=30";

    async function safeFetch(url, options = {}, timeoutMs = 12000) {
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

    const [mmaRes, boxingRes] = await Promise.all([
      safeFetch(MMA_API, {
        headers: {
          "X-RapidAPI-Key": RAPID_KEY,
          "X-RapidAPI-Host": "mmaapi.p.rapidapi.com",
        },
      }),
      safeFetch(BOXING_API, {
        headers: {
          "X-RapidAPI-Key": RAPID_KEY,
          "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
        },
      }),
    ]);

    // ─── Process UFC/MMA ───
    let ufcEvents = [];
    let mmaDebug = { status: mmaRes?.status || "no response", error: null };

    if (mmaRes && mmaRes.ok) {
      try {
        const mmaData = await mmaRes.json();
        // The endpoint usually returns { events: [...] } or directly array or { data: [...] }
        ufcEvents = mmaData?.events || mmaData?.data || mmaData || [];
        // Optional: filter only upcoming if the API includes past ones
        ufcEvents = ufcEvents.filter(event => {
          const eventDate = new Date(event.startTime || event.date || event.datetime);
          return eventDate > new Date();
        });
      } catch (parseErr) {
        mmaDebug.error = `Parse failed: ${parseErr.message}`;
      }
    } else if (mmaRes) {
      mmaDebug.error = `HTTP ${mmaRes.status}`;
    } else {
      mmaDebug.error = "fetch timeout or failed";
    }

    // ─── Process Boxing ───
    let boxingData = [];
    let boxingDebug = { status: boxingRes?.status || "no response", error: null };

    if (boxingRes && boxingRes.ok) {
      try {
        boxingData = await boxingRes.json();
        // If it's wrapped (e.g. { events: [...] }), unwrap
        if (boxingData?.events) boxingData = boxingData.events;
      } catch (parseErr) {
        boxingDebug.error = `Parse failed: ${parseErr.message}`;
      }
    } else if (boxingRes) {
      boxingDebug.error = `HTTP ${boxingRes.status}`;
    } else {
      boxingDebug.error = "fetch timeout or failed";
    }

    // ─── Final Response ───
    return new Response(
      JSON.stringify({
        ufc: ufcEvents,
        boxing: boxingData,
        count: {
          ufcEvents: ufcEvents.length,
          boxingEvents: boxingData.length,
        },
        _debug: {
          mma: mmaDebug,
          boxing: boxingDebug,
          queriedAt: new Date().toISOString(),
        },
      }, null, 2),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (err) {
    // Global safety net — worker will never 1101
    console.error("Fights endpoint crashed:", err.message, err.stack);
    return new Response(
      JSON.stringify({
        error: "Internal error fetching fight data",
        message: err.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}
