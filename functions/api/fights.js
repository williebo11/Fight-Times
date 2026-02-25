export async function onRequestGet(context) {
  const RAPID_KEY      = context.env.RAPIDAPI_KEY;
  const SPORTRADAR_KEY = context.env.SPORTRADAR_KEY;

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

  // Try both trial and production URLs simultaneously
  const [trialRes, prodRes, boxingRes] = await Promise.all([
    safeFetch(`https://api.sportradar.com/mma/trial/v2/en/schedules/upcoming/schedule.json?api_key=${SPORTRADAR_KEY}`),
    safeFetch(`https://api.sportradar.com/mma/production/v2/en/schedules/upcoming/schedule.json?api_key=${SPORTRADAR_KEY}`),
    safeFetch(BOXING_API, {
      headers: {
        "X-RapidAPI-Key":  RAPID_KEY,
        "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
      },
    }),
  ]);

  // Read both MMA responses as raw text so we see exactly what comes back
  const trialText = trialRes  ? await trialRes.text()  : "no response";
  const prodText  = prodRes   ? await prodRes.text()   : "no response";

  let trialJson = null, prodJson = null;
  try { trialJson = JSON.parse(trialText); } catch(e) { trialJson = trialText; }
  try { prodJson  = JSON.parse(prodText);  } catch(e) { prodJson  = prodText; }

  // Boxing (working — keep as normal)
  let boxingData = [];
  if (boxingRes && boxingRes.ok) {
    try { boxingData = await boxingRes.json(); } catch(e) {}
  }

  return new Response(
    JSON.stringify({
      _debug: {
        trial: { status: trialRes?.status, data: trialJson },
        prod:  { status: prodRes?.status,  data: prodJson  },
      },
      boxing: boxingData,
    }, null, 2),
    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
  );
}
