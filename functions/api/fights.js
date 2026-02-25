export async function onRequestGet(context) {
  try {
    const SPORTRADAR_KEY = context.env.SPORTRADAR_KEY;
    const RAPID_KEY = context.env.RAPIDAPI_KEY;

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

    // Prepare date (hardcoded as in your first snippet; change to dynamic if needed)
    const now = new Date();
    const year  = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day   = String(now.getDate()).padStart(2, '0');

    const MMA_URL = `https://api.sportradar.com/mma/trial/v2/en/schedules/2026-02-28/summaries.json?api_key=${SPORTRADAR_KEY}`;

    const BOXING_API = "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=30";

    // Fetch both in parallel
    const [mmaRes, boxingRes] = await Promise.all([
      safeFetch(MMA_URL),  // Sportradar MMA (UFC-ish)
      safeFetch(BOXING_API, {
        headers: {
          "X-RapidAPI-Key": RAPID_KEY,
          "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
        },
      }),
    ]);

    // ─── Process MMA (Sportradar) ───
    let mmaRaw = null;
    let mmaDebug = { url: MMA_URL.replace(SPORTRADAR_KEY, 'REDACTED'), status: mmaRes?.status || "no response" };

    if (mmaRes) {
      const text = await mmaRes.text();
      try {
        mmaRaw = JSON.parse(text);
      } catch (e) {
        mmaRaw = text; // fallback to raw text on parse error
        mmaDebug.parseError = e.message;
      }
    } else {
      mmaDebug.error = "fetch failed or timeout";
    }

    // Optional: extract UFC fights only (as before)
    let ufcFights = [];
    if (mmaRaw?.summaries) {
      ufcFights = mmaRaw.summaries.filter(summary =>
        summary.sport_event?.sport_event_context?.category?.name === "UFC"
      );
    }

    // ─── Process Boxing ───
    let boxingData = [];
    let boxingDebug = { status: boxingRes?.status || "no response" };

    if (boxingRes) {
      if (boxingRes.ok) {
        try {
          boxingData = await boxingRes.json();
        } catch (parseErr) {
          boxingDebug.parseError = parseErr.message;
        }
      } else {
        const errorText = await boxingRes.text().catch(() => "no body");
        boxingDebug.error = `HTTP ${boxingRes.status}: ${errorText}`;
        throw new Error(`Boxing API ${boxingRes.status}: ${errorText}`);
      }
    } else {
      boxingDebug.error = "fetch failed or timeout";
    }

    // ─── Final Response ───
    return new Response(
      JSON.stringify({
        ufc: ufcFights,          // filtered UFC bouts from Sportradar
        boxing: boxingData,      // full boxing schedule
        rawUfc: mmaRaw,          // full Sportradar response if needed
        count: {
          ufcFights: ufcFights.length,
          boxingEvents: boxingData.length || 0,
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
    // Safety net: always return JSON, never let Worker crash
    console.error("Fights endpoint error:", err.message, err.stack);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch fight data",
        message: err.message || "Unknown error",
        _debug: { timestamp: new Date().toISOString() },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}
