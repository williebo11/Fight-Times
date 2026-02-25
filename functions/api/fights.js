export async function onRequestGet(context) {
  const RAPID_KEY = context.env.RAPIDAPI_KEY;

  // ✅ NEW: Tapology API — org IDs 16=UFC, 69=Bellator, 78=PFL
  const MMA_API =
    "https://unofficial-tapology-api.p.rapidapi.com/api/schedule/events/16,69,78?fields=organization%2Cmain_event%2Cweight_class%2Cdatetime%2Ccity%2Csubregion%2Cbroadcast%2Ctitle_bout_desc%2Cfight_card";

  // 🥊 Boxing — unchanged
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

  // MMA
  let mmaEvents = [];
  if (mmaRes && mmaRes.ok) {
    try {
      const mmaData = await mmaRes.json();
      // Tapology returns { events: [...] } or an array directly
      mmaEvents = mmaData?.events || mmaData?.data || mmaData || [];
    } catch (e) {
      console.warn("MMA JSON parse failed:", e.message);
    }
  } else {
    console.warn("MMA API unavailable:", mmaRes?.status);
  }

  // Boxing
  let boxingData = [];
  if (boxingRes && boxingRes.ok) {
    try {
      boxingData = await boxingRes.json();
    } catch (e) {
      console.warn("Boxing JSON parse failed:", e.message);
    }
  } else {
    console.warn("Boxing API unavailable:", boxingRes?.status);
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
