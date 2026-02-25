export async function onRequestGet(context) {
  try {
    const RAPID_KEY = context.env.RAPIDAPI_KEY;

    // ✅ UFC: Use the scheduled events endpoint for UFC unique tournament (id=19906)
    // This returns UPCOMING events, not a hardcoded past tournament
    const MMA_API =
      "https://mmaapi.p.rapidapi.com/api/mma/unique-tournament/19906/events/next/0";

    // ✅ Boxing: Reduced to 7 days to fit free tier date range
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

    // Boxing is optional — don't crash if it fails
    let boxingData = [];
    if (boxingRes.ok) {
      boxingData = await boxingRes.json();
    } else {
      console.warn("Boxing API failed:", boxingRes.status, await boxingRes.text());
    }

    const mmaData = await mmaRes.json();

    // Extract events array — the /next/ endpoint returns { events: [...] }
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
