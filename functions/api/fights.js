export async function onRequest(context) {
  const UFC_KEY = "dd182ebd-221a-4ccf-a649-02806c1ce388";

  let ufcData    = { error: null, data: [] };
  let boxingData = { error: null, data: [] };

  // ── UFC (BallDontLie) ──
  try {
    const ufcRes = await fetch("https://api.balldontlie.io/mma/v1/events?status=upcoming&per_page=25", {
      headers: { "Authorization": UFC_KEY }
    });
    const text = await ufcRes.text();
    ufcData = JSON.parse(text);
  } catch (err) {
    ufcData = { error: err.message, data: [] };
  }

  // ── Boxing (TheSportsDB — free, no key needed) ──
  // League ID 4480 = Boxing
  try {
    const boxRes = await fetch("https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4480");
    const text = await boxRes.text();
    const parsed = JSON.parse(text);
    boxingData = { data: parsed.events || [] };
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
