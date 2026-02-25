export async function onRequestGet(context) {
  // Static data - update this manually every few days
  const upcomingFights = {
  ufc: [
    {
      id: "ufc-fn-strickland-2026-02-21",
      promotion: "UFC",
      event: "UFC Fight Night: Strickland vs. Hernandez",
      date: "2026-02-21T02:00:00Z",
      time_utc: "2026-02-21T02:00:00Z",
      venue: "Toyota Center, Houston, TX, USA",
      main_event: "Sean Strickland vs. Anthony Hernandez (Middleweight)",
      broadcast: "Paramount+"
    },
    {
      id: "ufc-fn-moreno-2026-02-28",
      promotion: "UFC",
      event: "UFC Fight Night: Moreno vs. Kavanagh",
      date: "2026-02-28T03:00:00Z",
      time_utc: "2026-02-28T03:00:00Z",
      venue: "Arena CDMX, Mexico City, Mexico",
      main_event: "Brandon Moreno vs. Lone'er Kavanagh (Flyweight)",
      broadcast: "Paramount+"
    },
    {
      id: "ufc-326-2026-03-07",
      promotion: "UFC",
      event: "UFC 326: Holloway vs. Oliveira 2",
      date: "2026-03-07T04:00:00Z",
      time_utc: "2026-03-07T04:00:00Z",
      venue: "T-Mobile Arena, Las Vegas, NV, USA",
      main_event: "Max Holloway vs. Charles Oliveira 2 (Lightweight)",
      broadcast: "PPV / Paramount+"
    },
    {
      id: "ufc-fn-emmett-2026-03-14",
      promotion: "UFC",
      event: "UFC Fight Night: Emmett vs. Vallejos",
      date: "2026-03-14T00:00:00Z",
      time_utc: "2026-03-14T00:00:00Z",
      venue: "Meta APEX, Las Vegas, NV, USA",
      main_event: "Josh Emmett vs. Kevin Vallejos (Featherweight)",
      broadcast: "Paramount+"
    },
    {
      id: "ufc-fn-evloev-2026-03-21",
      promotion: "UFC",
      event: "UFC Fight Night: Evloev vs. Murphy",
      date: "2026-03-21T13:00:00Z", // UK card: 1pm ET prelim
      time_utc: "2026-03-21T13:00:00Z",
      venue: "The O2 Arena, London, England",
      main_event: "Movsar Evloev vs. Lerone Murphy (Featherweight)",
      broadcast: "Paramount+"
    },
    {
      id: "ufc-fn-adesanya-2026-03-28",
      promotion: "UFC",
      event: "UFC Fight Night: Adesanya vs. Pyfer",
      date: "2026-03-28T02:00:00Z",
      time_utc: "2026-03-28T02:00:00Z",
      venue: "Climate Pledge Arena, Seattle, WA, USA",
      main_event: "Israel Adesanya vs. Joe Pyfer (Middleweight)",
      broadcast: "Paramount+"
    },
    {
      id: "ufc-fn-moicano-2026-04-04",
      promotion: "UFC",
      event: "UFC Fight Night: Moicano vs. Duncan",
      date: "2026-04-04T02:00:00Z",
      time_utc: "2026-04-04T02:00:00Z",
      venue: "UFC APEX, Las Vegas, NV, USA",
      main_event: "Renato Moicano vs. Chris Duncan (Lightweight)",
      broadcast: "Paramount+"
    },
    {
      id: "ufc-327-2026-04-11",
      promotion: "UFC",
      event: "UFC 327: Van vs. Taira",
      date: "2026-04-11T03:00:00Z",
      time_utc: "2026-04-11T03:00:00Z",
      venue: "Kaseya Center, Miami, FL, USA",
      main_event: "Joshua Van vs. Tatsuro Taira (Flyweight Title)",
      broadcast: "PPV / Paramount+"
    }
  ],
  boxing: [
    {
      id: "box-opetaia-2026-03-08",
      promotion: "Zuffa Boxing",
      event: "Zuffa Boxing 4: Opetaia vs. Glanton",
      date: "2026-03-08T03:00:00Z",
      time_utc: "2026-03-08T03:00:00Z",
      venue: "Meta APEX, Las Vegas, NV, USA",
      main_event: "Jai Opetaia vs. Brandon Glanton (Cruiserweight)",
      broadcast: "Paramount+"
    },
    {
      id: "box-dickens-cacace-2026-03-14",
      promotion: "DAZN",
      event: "Jazza Dickens vs. Anthony Cacace",
      date: "2026-03-14T19:00:00Z",
      time_utc: "2026-03-14T19:00:00Z",
      venue: "3Arena, Dublin, Ireland",
      main_event: "Jazza Dickens vs. Anthony Cacace (Super Featherweight)",
      broadcast: "DAZN"
    },
    {
      id: "box-chisora-wilder-2026-04-04",
      promotion: "DAZN",
      event: "Derek Chisora vs. Deontay Wilder",
      date: "2026-04-04T16:00:00Z",
      time_utc: "2026-04-04T16:00:00Z",
      venue: "The O2 Arena, London, England",
      main_event: "Derek Chisora vs. Deontay Wilder (Heavyweight)",
      broadcast: "DAZN"
    },
    {
      id: "box-smith-morrell-2026-04-18",
      promotion: "DAZN",
      event: "Callum Smith vs. David Morrell",
      date: "2026-04-18T19:00:00Z",
      time_utc: "2026-04-18T19:00:00Z",
      venue: "M&S Bank Arena, Liverpool, England",
      main_event: "Callum Smith vs. David Morrell (Light Heavyweight)",
      broadcast: "DAZN"
    },
    {
      id: "box-benavidez-ramirez-2026-05-02",
      promotion: "Premier Boxing Champions",
      event: "Gilberto Ramirez vs. David Benavidez",
      date: "2026-05-02T03:00:00Z",
      time_utc: "2026-05-02T03:00:00Z",
      venue: "T-Mobile Arena, Las Vegas, NV, USA",
      main_event: "Gilberto Ramirez vs. David Benavidez (Cruiserweight Titles)",
      broadcast: "Prime Video PPV"
    }
  ]
};
  return new Response(
    JSON.stringify({
      ufc: upcomingFights.ufc,
      boxing: upcomingFights.boxing,
      count: {
        ufcEvents: upcomingFights.ufc.length,
        boxingEvents: upcomingFights.boxing.length
      },
      lastUpdated: "2026-02-25",
      note: "Manually curated upcoming fights – check official sources for latest"
    }, null, 2),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600" // cache 1 hour in browser/CDN
      }
    }
  );
}
