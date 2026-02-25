export default {
  async fetch(request) {

    // === UFC (BallDontLie MMA) ===
    const ufcRes = await fetch(
      "https://api.balldontlie.io/mma/v1/events?per_page=25",
      {
        headers: {
          Authorization: "dd182ebd-221a-4ccf-a649-02806c1ce388"
        }
      }
    );

    const ufcData = await ufcRes.json();

    // Keep only UFC league events
    const ufcEvents = (ufcData.data || [])
      .filter(e => e.league && e.league.name === "UFC")
      .map(e => ({
        type: "UFC",
        id: e.id,
        name: e.name,
        date: e.date,
        venue: e.venue_name,
        city: e.venue_city,
        country: e.venue_country,
        status: e.status
      }));


    // === BOXING (RapidAPI Boxing Data API) ===
    const boxingRes = await fetch(
      "https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=30",
      {
        headers: {
          "X-RapidAPI-Key": "ecb9ddf1b3msh9a639108aea55e9p19af3fjsn3f3aedde51b9",
          "X-RapidAPI-Host": "boxing-data-api.p.rapidapi.com"
        }
      }
    );

    const boxingData = await boxingRes.json();

    const boxingEvents = (boxingData.data || []).map(e => ({
      type: "Boxing",
      id: e.id,
      name: e.name || e.title || "Boxing Event",
      date: e.date,
      venue: e.venue_name,
      city: e.venue_city,
      country: e.venue_country,
      status: e.status
    }));


    // === COMBINE ===
    const combined = [...ufcEvents, ...boxingEvents]
      .filter(e => e.date)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return new Response(
      JSON.stringify({
        success: true,
        events: combined
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
