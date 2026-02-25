export async function onRequestGet(context) {
  try {
    const RAPID_KEY = context.env.RAPIDAPI_KEY;

    // 🔥 MMA (UFC tournament)
    const MMA_API =
      "https://mmaapi.p.rapidapi.com/api/mma/unique-tournament/19906/tournament/114389/mma-events/all";

    // 🥊 Boxing
    const BOXING_API =
      "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=30";

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

    if (!boxingRes.ok) {
      const text = await boxingRes.text();
      throw new Error(`Boxing API ${boxingRes.status}: ${text}`);
    }

    const mmaData = await mmaRes.json();
    const boxingData = await boxingRes.json();

    // 🔥 Extract MMA events safely
    const mmaEvents =
      mmaData?.events ||
      mmaData?.data ||
      mmaData ||
      [];

    return new Response(
      JSON.stringify({
        ufc: mmaEvents,
        boxing: boxingData,
      }),
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
