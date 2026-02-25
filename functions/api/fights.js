export async function onRequestGet(context) {
  const RAPID_KEY = context.env.RAPIDAPI_KEY;

  // Tapology requires one org ID at a time
  const TAPOLOGY_BASE =
    "https://unofficial-tapology-api.p.rapidapi.com/api/schedule/events";
  const MMA_FIELDS =
    "fields=organization%2Cmain_event%2Cweight_class%2Cdatetime%2Ccity%2Csubregion%2Cbroadcast%2Ctitle_bout_desc%2Cfight_card";

  const UFC_URL      = `${TAPOLOGY_BASE}/16?${MMA_FIELDS}`;
  const BELLATOR_URL = `${TAPOLOGY_BASE}/69?${MMA_FIELDS}`;
  const PFL_URL      = `${TAPOLOGY_BASE}/78?${MMA_FIELDS}`;

  const BOXING_API =
    "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7";

  async function safeFetch(url, host, timeoutMs = 8000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        headers: {
          "X-RapidAPI-Key":  RAPID_KEY,
          "X-RapidAPI-Host": host,
        },
        signal: controller.signal,
      });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      console.warn(`safeFetch failed for ${url}:`, err.message);
      return null;
    }
  }

  // Fire all 4 requests in parallel
  const [ufcRes, bellatorRes, pflRes, boxingRes] = await Promise.all([
    safeFetch(UFC_URL,      "unofficial-tapology-api.p.rapidapi.com"),
    safeFetch(BELLATOR_URL, "unofficial-tapology-api.p.rapidapi.com"),
    safeFetch(PFL_URL,      "unofficial-tapology-api.p.rapidapi.com"),
    safeFetch(BOXING_API,   "boxing-data-api.p.rapidapi.com"),
  ]);

  // Helper to extract events array from a Tapology response
  async function parseTapology(res, label) {
    if (!res || !res.ok) {
      console.warn(`${label} unavailable:`, res?.status);
      return [];
    }
    try {
      const json = await res.json();
      // Tapology may return array directly, or { events: [] }, or { data: [] }
      return Array.isArray(json) ? json
        : Array.isArray(json?.events) ? json.events
        : Array.isArray(json?.data)   ? json.data
        : [];
    } catch (e) {
      console.warn(`${label} parse failed:`, e.message);
      return [];
    }
  }

  const [ufcEvents, bellatorEvents, pflEvents] = await Promise.all([
    parseTapology(ufcRes,      "UFC"),
    parseTapology(bellatorRes, "Bellator"),
    parseTapology(pflRes,      "PFL"),
  ]);

  const mmaEvents = [...ufcEvents, ...bellatorEvents, ...pflEvents];

  // Boxing
  let boxingData = [];
  if (boxingRes && boxingRes.ok) {
    try {
      boxingData = await boxingRes.json();
    } catch (e) {
      console.warn("Boxing parse failed:", e.message);
    }
  } else {
    console.warn("Boxing unavailable:", boxingRes?.status);
  }

  return new Response(
    JSON.stringify({ ufc: mmaEvents, boxing: boxingData }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
