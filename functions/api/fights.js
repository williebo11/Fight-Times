export async function onRequestGet(context) {
  try {
    const UFC_API = "dd182ebd-221a-4ccf-a649-02806c1ce388";
    const BOXING_API = "ecb9ddf1b3msh9a639108aea55e9p19af3fjsn3f3aedde51b9";

    const [ufcRes, boxingRes] = await Promise.all([
      fetch(UFC_API, {
        headers: {
          "X-RapidAPI-Key": context.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "ufc-api-host"
        }
      }),
      fetch(BOXING_API, {
        headers: {
          "X-RapidAPI-Key": context.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com"
        }
      })
    ]);

    const ufc = await ufcRes.json();
    const boxing = await boxingRes.json();

    return new Response(
      JSON.stringify({ ufc, boxing }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
