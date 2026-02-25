export async function onRequestGet(context) {
  const RAPID_KEY   = context.env.RAPIDAPI_KEY;
  const SPORTRADAR_KEY = context.env.SPORTRADAR_KEY; // add this in Cloudflare env vars

  const MMA_API   = `https://api.sportradar.com/mma/trial/v2/en/schedules/upcoming/schedule.json?api_key=${SPORTRADAR_KEY}`;
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
      console.warn(`safeFetch failed for ${url}:`, err.message);
      return null;
    }
  }

  const [mmaRes, boxingRes] = await Promise.all([
    safeFetch(MMA_API), // SportRadar uses key in URL, no extra headers needed
    safeFetch(BOXING_API, {
      headers: {
        "X-RapidAPI-Key":  RAPID_KEY,
        "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
      },
    }),
  ]);

  // MMA
  let mmaEvents = [];
  if (mmaRes && mmaRes.ok) {
    try {
      const json = await mmaRes.json();
      // SportRadar returns { sport_events: [...] }
      mmaEvents = json?.sport_events || json?.schedules || json?.results || [];
    } catch (e) {
      console.warn("MMA parse failed:", e.message);
    }
  } else {
    console.warn("MMA unavailable:", mmaRes?.status);
  }

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
```

**Two things you need to do:**

1. **Add the key to Cloudflare** — go to your Pages project → Settings → Environment Variables → add `SPORTRADAR_KEY` with value `dd182ebd-221a-4ccf-a649-02806c1ce388`

2. **Check if it's trial or production** — if the trial URL returns a 401, swap `trial` for `production` in the URL. You can also just test it in your browser first:
```
https://api.sportradar.com/mma/trial/v2/en/schedules/upcoming/schedule.json?api_key=dd182ebd-221a-4ccf-a649-02806c1ce388
