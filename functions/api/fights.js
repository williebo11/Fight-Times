export async function onRequestGet(context) {
  const RAPID_KEY = context.env.RAPIDAPI_KEY;

  const MMA_API =
    "https://unofficial-tapology-api.p.rapidapi.com/api/schedule/events/16,69,78?fields=organization%2Cmain_event%2Cweight_class%2Cdatetime%2Ccity%2Csubregion%2Cbroadcast%2Ctitle_bout_desc%2Cfight_card";

  const BOXING_API =
    "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7";

  async function safeFetch(url, options, timeoutMs = 8000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      console.warn(`safeFetch failed for ${url}:`, err.message);
      return null;
    }
  }

  const headers = (host) => ({
    "X-RapidAPI-Key": RAPID_KEY,
    "X-RapidAPI-Host": host,
  });

  const [mmaRes, boxingRes] = await Promise.all([
    safeFetch(MMA_API, { headers: headers("unofficial-tapology-api.p.rapidapi.com") }),
    safeFetch(BOXING_API, { headers: headers("boxing-data-api.p.rapidapi.com") }),
  ]);

  // MMA — return raw response so we can see the real shape
  let mmaRaw = null;
  let mmaError = null;
  if (mmaRes) {
    if (mmaRes.ok) {
      try {
        mmaRaw = await mmaRes.json();
      } catch (e) {
        mmaError = "JSON parse failed: " + e.message;
      }
    } else {
      mmaError = `HTTP ${mmaRes.status}: ${await mmaRes.text()}`;
    }
  } else {
    mmaError = "Request timed out or failed";
  }

  // Boxing — return raw response too
  let boxingRaw = null;
  let boxingError = null;
  if (boxingRes) {
    if (boxingRes.ok) {
      try {
        boxingRaw = await boxingRes.json();
      } catch (e) {
        boxingError = "JSON parse failed: " + e.message;
      }
    } else {
      boxingError = `HTTP ${boxingRes.status}: ${await boxingRes.text()}`;
    }
  } else {
    boxingError = "Request timed out or failed";
  }

  // Return everything raw — no normalization — so we can see the real data shape
  return new Response(
    JSON.stringify({
      debug: true,
      mma: {
        error: mmaError,
        status: mmaRes?.status,
        data: mmaRaw,
      },
      boxing: {
        error: boxingError,
        status: boxingRes?.status,
        data: boxingRaw,
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
