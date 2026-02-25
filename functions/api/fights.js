export async function onRequest(context) {
  const UFC_KEY    = "dd182ebd-221a-4ccf-a649-02806c1ce388";
  const BOXING_KEY = "ecb9ddf1b3msh9a639108aea55e9p19af3fjsn3f3aedde51b9";

  const ufcRes = await fetch("https://api.balldontlie.io/mma/v1/events?status=upcoming", {
    headers: { "Authorization": UFC_KEY }
  });
  const ufcData = await ufcRes.json();

  const boxRes = await fetch("https://boxing-data.p.rapidapi.com/upcoming", {
    headers: {
      "X-RapidAPI-Key":  BOXING_KEY,
      "X-RapidAPI-Host": "boxing-data.p.rapidapi.com"
    }
  });
  const boxData = await boxRes.json();

  return new Response(JSON.stringify({ ufc: ufcData, boxing: boxData }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
