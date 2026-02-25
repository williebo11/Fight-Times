export async function onRequestGet(context) {
  const RAPID_KEY      = context.env.RAPIDAPI_KEY;
  const SPORTRADAR_KEY = context.env.SPORTRADAR_KEY;

  const BOXING_API = "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7";

  // SportRadar MMA upcoming schedule
  const MMA_API = `https://api.sportradar.com/mma/trial/v2/en/schedules/upcoming/schedule.json?api_key=${SPORTRADAR_KEY}`;

  async function safeFetch(url, options = {}, timeoutMs = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      console.warn(`safeFetch failed: ${err.message}`);
      return null;
    }
  }

  const [mmaRes, boxingRes] = await Promise.all([
    safeFetch(MMA_API),
    safeFetch(BOXING_API, {
      headers: {
        "X-RapidAPI-Key":  RAPID_KEY,
        "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
      },
    }),
  ]);

  // Read MMA raw so we can see the exact shape
  let mmaRaw = null;
  if (mmaRes) {
    const text = await mmaRes.text();
    try { mmaRaw = JSON.parse(text); } catch(e) { mmaRaw = text; }
  }

  // Boxing (working)
  let boxingData = [];
  if (boxingRes && boxingRes.ok) {
    try { boxingData = await boxingRes.json(); } catch(e) {}
  }

  return new Response(
    JSON.stringify({
      _mmaDebug: { status: mmaRes?.status, data: mmaRaw },
      boxing: boxingData,
    }, null, 2),
    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
  );
}
