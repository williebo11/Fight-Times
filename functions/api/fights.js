export async function onRequest(context) {
  const UFC_KEY    = "dd182ebd-221a-4ccf-a649-02806c1ce388";
  const BOXING_KEY = "ecb9ddf1b3msh9a639108aea55e9p19af3fjsn3f3aedde51b9";

  let ufcData    = { error: null, data: [] };
  let boxingData = { error: null, data: [] };

  // ── UFC: fetch both "scheduled" and "upcoming" ──
  try {
    const [res1, res2] = await Promise.all([
      fetch("https://api.balldontlie.io/mma/v1/events?status=scheduled&per_page=25", {
        headers: { "Authorization": UFC_KEY }
      }),
      fetch("https://api.balldontlie.io/mma/v1/events?status=upcoming&per_page=25", {
        headers: { "Authorization": UFC_KEY }
      })
    ]);

    const [data1, data2] = await Promise.all([
      res1.json().catch(() => ({ data: [] })),
      res2.json().catch(() => ({ data: [] }))
    ]);

    const combined = [...(data1.data || []), ...(data2.data || [])];
    const seen = new Set();
    const deduped = combined.filter(e => {
      if (seen.has(e.id)) return false;
      seen.add(e.id);
      return true;
    });

    deduped.sort((a, b) => new Date(a.date) - new Date(b.date));
    ufcData = { data: deduped };

  } catch (err) {
    ufcData = { error: err.message, data: [] };
  }

  // ── Boxing ──
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
