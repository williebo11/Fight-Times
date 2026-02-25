export async function onRequest(context) {
  const UFC_KEY    = "dd182ebd-221a-4ccf-a649-02806c1ce388";
  const BOXING_KEY = "ecb9ddf1b3msh9a639108aea55e9p19af3fjsn3f3aedde51b9";

  let ufcData    = { error: null, data: [] };
  let boxingData = { error: null, data: [] };

  try {
    const ufcRes = await fetch("https://api.balldontlie.io/mma/v1/events?status=upcoming&per_page=25", {
      headers: { "Authorization": UFC_KEY }
    });
    const text = await ufcRes.text();
    ufcData = JSON.parse(text);
  } catch (err) {
    ufcData = { error: err.message, data: [] };
  }

  try {
    const boxRes = await fetch("https://boxing-data-api.p.rapidapi.com/v1/events/?status=upcoming", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key":  BOXING_KEY,
        "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com"
      }
    });
    const text = await boxRes.text();
    boxingData = JSON.parse(text);
  } catch (err) {
    boxingData = { error: err.message, data: [] };
  }

  return new Response(JSON.stringify({ ufc: ufcData, boxing: boxingData }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
