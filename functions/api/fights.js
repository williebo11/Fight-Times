export async function onRequestGet(context) {
  const RAPID_KEY    = context.env.RAPIDAPI_KEY;
  const APISPORTS_KEY = context.env.APISPORTS_KEY; 

  const MMA_API = "https://v1.mma.api-sports.io/fights?next=10";
  const BOXING_API = "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7";

  async function safeFetch(url, options = {}, timeoutMs = 8000) {
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
        "x-apisports-key": APISPORTS_KEY,
      },
    }),
    safeFetch(BOXING_API, {
      headers: {
        "X-RapidAPI-Key":  RAPID_KEY,
        "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
      },
    }),
  ]);

  // Read MMA raw so we see exact shape
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
