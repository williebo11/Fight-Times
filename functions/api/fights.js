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

  // Build correct date format: YYYY-MM-DD split into year-month-day
  const now = new Date();
  const year  = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day   = String(now.getDate()).padStart(2, '0');

  // Correct URL format: summaries.json with api_key as query param
  const MMA_URL = `https://api.sportradar.com/mma/trial/v2/en/schedules/2026-02-28/summaries.json?api_key=${SPORTRADAR_KEY}`;
  const [boxingRes, mmaRes] = await Promise.all([
    safeFetch(BOXING_API, {
      headers: {
        "X-RapidAPI-Key":  RAPID_KEY,
        "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
      },
    }),
    safeFetch(MMA_URL),
  ]);

  // Read MMA raw
  let mmaRaw = null;
  if (mmaRes) {
    const text = await mmaRes.text();
    try { mmaRaw = JSON.parse(text); } catch(e) { mmaRaw = text; }
  }

  // Boxing
  let boxingData = [];
  if (boxingRes && boxingRes.ok) {
    try { boxingData = await boxingRes.json(); } catch(e) {}
  }

  return new Response(
    JSON.stringify({
      ufc: [],
      boxing: boxingData,
      _debug: { url: MMA_URL.replace(SPORTRADAR_KEY, 'REDACTED'), status: mmaRes?.status, data: mmaRaw },
    }, null, 2),
    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
  );
}
