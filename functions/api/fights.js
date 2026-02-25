export async function onRequestGet(context) {
  const RAPID_KEY     = context.env.RAPIDAPI_KEY;
  const APISPORTS_KEY = context.env.APISPORTS_KEY;
  const BOXING_API    = "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7";

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

  // Build date strings for today + next 6 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const mmaHeaders = { "x-apisports-key": APISPORTS_KEY };
  const boxingHeaders = {
    "X-RapidAPI-Key":  RAPID_KEY,
    "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
  };

  // Fire all 7 date requests + boxing in parallel
  const [boxingRes, ...mmaResponses] = await Promise.all([
    safeFetch(BOXING_API, { headers: boxingHeaders }),
    ...dates.map(date =>
      safeFetch(`https://v1.mma.api-sports.io/fights?date=${date}`, { headers: mmaHeaders })
    ),
  ]);

  // Parse all MMA responses and merge
  const mmaResults = await Promise.all(
    mmaResponses.map(async (res, i) => {
      if (!res || !res.ok) return { date: dates[i], status: res?.status, fights: [] };
      try {
        const json = await res.json();
        return { date: dates[i], status: res.status, fights: json?.response || [] };
      } catch(e) {
        return { date: dates[i], status: res?.status, error: e.message, fights: [] };
      }
    })
  );

  // Boxing
  let boxingData = [];
  if (boxingRes && boxingRes.ok) {
    try { boxingData = await boxingRes.json(); } catch(e) {}
  }

  return new Response(
    JSON.stringify({ _mmaDebug: mmaResults, boxing: boxingData }, null, 2),
    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
  );
}
