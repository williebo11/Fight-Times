export async function onRequestGet(context) {
  // Static data - update this manually every few days
  const upcomingFights = {
    ufc: [
      {
        id: "ufc-fn-2026-03-01",
        promotion: "UFC",
        event: "UFC Fight Night: Moreno vs. Kavanagh",
        date: "2026-03-01",
        time_utc: "2026-03-01T03:00:00Z", // main card start ~9-10pm Mexico City time
        venue: "Arena CDMX, Mexico City, Mexico",
        main_event: "Brandon Moreno vs. Lone'er Kavanagh (Flyweight)",
        co_main: "TBD vs. TBD",
        broadcast: "ESPN+ / Paramount+",
        fights: [
          { fighters: "Brandon Moreno vs. Lone'er Kavanagh", weight: "Flyweight", is_main: true },
          { fighters: "Damian Pinas vs. Wesley Schultz", weight: "Middleweight", is_prelim: true },
          { fighters: "Erik Silva vs. Francis Marshall", weight: "Featherweight", is_prelim: true },
          { fighters: "Sofia Montenegro vs. Ernesta Kareckaite", weight: "Flyweight (women)", is_prelim: true },
          { fighters: "Macy Chiasson vs. Ailin Perez", weight: "Bantamweight (women)", is_prelim: true },
          // add more as announced
        ],
        status: "announced"
      },
      {
        id: "ufc-307",
        promotion: "UFC",
        event: "UFC 307: Pereira vs. Rountree Jr.",
        date: "2026-03-08", // example - adjust to real schedule
        time_utc: "2026-03-08T04:00:00Z",
        venue: "Delta Center, Salt Lake City, Utah, USA",
        main_event: "Alex Pereira vs. Khalil Rountree Jr. (Light Heavyweight Title)",
        broadcast: "PPV / ESPN+",
        fights: [
          { fighters: "Alex Pereira vs. Khalil Rountree Jr.", weight: "Light Heavyweight Title", is_main: true },
          // add prelims when known
        ],
        status: "announced"
      }
      // Add more UFC events for March 2026 as they get announced
    ],

    boxing: [
      {
        id: "box-2026-03-01",
        promotion: "Matchroom / DAZN",
        event: "Shakur Stevenson vs. Floyd Schofield",
        date: "2026-03-01",
        time_utc: "2026-03-01T04:00:00Z",
        venue: "Newark, New Jersey, USA (or TBD)",
        main_event: "Shakur Stevenson vs. Floyd Schofield (Lightweight)",
        broadcast: "DAZN PPV",
        fights: [
          { fighters: "Shakur Stevenson vs. Floyd Schofield", weight: "Lightweight", is_main: true }
        ],
        status: "announced"
      },
      {
        id: "box-2026-03-15",
        promotion: "Top Rank / ESPN",
        event: "Vergil Ortiz Jr. vs. Serhii Bohachuk II",
        date: "2026-03-15",
        time_utc: "2026-03-15T03:00:00Z",
        venue: "TBD (likely Las Vegas or Texas)",
        main_event: "Vergil Ortiz Jr. vs. Serhii Bohachuk II (Welterweight)",
        broadcast: "ESPN",
        fights: [
          { fighters: "Vergil Ortiz Jr. vs. Serhii Bohachuk II", weight: "Welterweight", is_main: true }
        ],
        status: "rumored / likely"
      }
      // Add more: Canelo undercard, Inoue, Tank Davis, etc. when confirmed
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
