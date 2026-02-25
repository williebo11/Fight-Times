export async function onRequestGet(context) {
  try {
    const RAPID_KEY = context.env.RAPIDAPI_KEY;

    // 🔥 MMA (UFC tournament) — unchanged, this works
    const MMA_API =
      "https://mmaapi.p.rapidapi.com/api/mma/unique-tournament/19906/tournament/114389/mma-events/all";

    // 🥊 Boxing — changed days=30 to days=7 to fix the 403 DateOutOfRange error
    const BOXING_API =
      "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=7";

    const [mmaRes, boxingRes] = await Promise.all([
      fetch(MMA_API, {
        headers: {
          "X-RapidAPI-Key": RAPID_KEY,
          "X-RapidAPI-Host": "mmaapi.p.rapidapi.com",
        },
      }),
      fetch(BOXING_API, {
        headers: {
          "X-RapidAPI-Key": RAPID_KEY,
          "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
        },
      }),
    ]);

    if (!mmaRes.ok) {
      const text = await mmaRes.text();
      throw new Error(`MMA API ${mmaRes.status}: ${text}`);
    }

    // Boxing non-fatal — don't crash the whole response if boxing fails
    let boxingData = [];
    if (boxingRes.ok) {
      boxingData = await boxingRes.json();
    } else {
      console.warn("Boxing API failed:", boxingRes.status);
    }

    const mmaData = await mmaRes.json();
    const mmaEvents = mmaData?.events || mmaData?.data || mmaData || [];

    return new Response(
      JSON.stringify({ ufc: mmaEvents, boxing: boxingData }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
