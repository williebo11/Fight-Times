export async function onRequestGet(context) {
  try {
    const UFC_API = "https://api.balldontlie.io/mma/v1/events";
    const BOXING_API =
      "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=30";

    const [ufcRes, boxingRes] = await Promise.all([
      fetch(UFC_API, {
        headers: {
          Authorization: `Bearer ${context.env.UFC_API_KEY}`,
        },
      }),
      fetch(BOXING_API, {
        headers: {
          "X-RapidAPI-Key": context.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com",
        },
      }),
    ]);

    // Check for failed responses BEFORE parsing JSON
    if (!ufcRes.ok) {
      const text = await ufcRes.text();
      throw new Error(`UFC API Error ${ufcRes.status}: ${text}`);
    }

    if (!boxingRes.ok) {
      const text = await boxingRes.text();
      throw new Error(`Boxing API Error ${boxingRes.status}: ${text}`);
    }

    const ufc = await ufcRes.json();
    const boxing = await boxingRes.json();

    return new Response(JSON.stringify({ ufc, boxing }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
