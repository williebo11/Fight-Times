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

  // Just test ONE date first to confirm the endpoint + key work
  const today = new Date().toISOString().split('T')[0];

  const [boxingRes, mmaRes] = await Promise.all([
    safeFetch(BOXING_API, {
      headers: {
        "X-RapidAPI-Key":  RAPID_KEY,
        "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
      },
    }),
    safeFetch(
      `https://api.sportradar.com/mma/trial/v2/en/schedules/${today}/schedule.json`,
      { headers: { "x-api-key": SPORTRADAR_KEY, "accept": "application/json" } }
    ),
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
      _debug: { date: today, status: mmaRes?.status, data: mmaRaw },
    }, null, 2),
    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
  );
}
