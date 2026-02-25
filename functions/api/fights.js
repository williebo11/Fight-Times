export async function onRequestGet(context) {
  const RAPID_KEY = context.env.RAPIDAPI_KEY;

  const TAPOLOGY_BASE = "https://unofficial-tapology-api.p.rapidapi.com/api/schedule/events";
  const MMA_FIELDS = "fields=organization%2Cmain_event%2Cweight_class%2Cdatetime%2Ccity%2Csubregion%2Cbroadcast%2Ctitle_bout_desc%2Cfight_card";

  const BOXING_API = "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7";

  async function safeFetch(url, host, timeoutMs = 8000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        headers: { "X-RapidAPI-Key": RAPID_KEY, "X-RapidAPI-Host": host },
        signal: controller.signal,
      });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      console.warn(`safeFetch failed:`, err.message);
      return null;
    }
  }

  // Fire all in parallel
  const [ufcRes, boxingRes] = await Promise.all([
    safeFetch(`${TAPOLOGY_BASE}/16?${MMA_FIELDS}`, "unofficial-tapology-api.p.rapidapi.com"),
    safeFetch(BOXING_API, "boxing-data-api.p.rapidapi.com"),
  ]);

  // ── DEBUG: return the raw Tapology response so we can see its shape ──
  let ufcRaw = null;
  let ufcError = null;
  if (ufcRes) {
    const text = await ufcRes.text(); // read as text first
    ufcError = ufcRes.ok ? null : `HTTP ${ufcRes.status}`;
    try { ufcRaw = JSON.parse(text); } catch(e) { ufcRaw = text; }
  } else {
    ufcError = "Timed out";
  }

  // Boxing (already working — keep as-is)
  let boxingData = [];
  if (boxingRes && boxingRes.ok) {
    try { boxingData = await boxingRes.json(); } catch(e) {}
  }

  return new Response(
    JSON.stringify({ _ufcDebug: { status: ufcRes?.status, error: ufcError, raw: ufcRaw }, boxing: boxingData }, null, 2),
    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
  );
}
