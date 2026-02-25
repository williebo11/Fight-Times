const upcomingFights = {
  ufc: [
    {
      id: "ufc-fn-moreno-2026-02-28",
      promotion: "UFC",
      event: "UFC Fight Night: Moreno vs. Kavanagh",
      date: "2026-02-28T03:00:00Z", // main card approx start (adjust if needed)
      time_utc: "2026-02-28T03:00:00Z",
      venue: "Arena CDMX, Mexico City, Mexico",
      main_event: "Brandon Moreno vs. Lone'er Kavanagh (Flyweight)",
      broadcast: "Paramount+",
      fights: [
        { fighters: "Brandon Moreno vs. Lone'er Kavanagh", weight: "Flyweight", is_main: true },
        { fighters: "Marlon Vera vs. David Martinez", weight: "Bantamweight" },
        { fighters: "Daniel Zellhuber vs. TBA", weight: "Lightweight" }, // partial — remove if unwanted
        // add more from full card when you have them
      ]
    },
    {
      id: "ufc-326-2026-03-07",
      promotion: "UFC",
      event: "UFC 326: Holloway vs. Oliveira 2",
      date: "2026-03-07T04:00:00Z",
      time_utc: "2026-03-07T04:00:00Z",
      venue: "T-Mobile Arena, Las Vegas, NV, USA",
      main_event: "Max Holloway vs. Charles Oliveira (Featherweight?)",
      broadcast: "PPV / ESPN+"
    },
    {
      id: "ufc-fn-emmett-2026-03-14",
      promotion: "UFC",
      event: "UFC Fight Night: Emmett vs. Vallejos",
      date: "2026-03-14T00:00:00Z",
      time_utc: "2026-03-14T00:00:00Z",
      venue: "Meta APEX, Las Vegas, NV, USA",
      main_event: "Josh Emmett vs. Vallejos",
      broadcast: "Paramount+"
    }
    // Add March 21 & 28 similarly
  ],
  boxing: [
    {
      id: "box-opetaia-2026-03-08",
      promotion: "Paramount+ / Main Event",
      event: "Jai Opetaia vs. Brandon Glanton",
      date: "2026-03-08T03:00:00Z",
      time_utc: "2026-03-08T03:00:00Z",
      venue: "Meta APEX, Las Vegas, NV, USA (or similar)",
      main_event: "Jai Opetaia vs. Brandon Glanton (Cruiserweight Title)",
      broadcast: "Paramount+"
    },
    {
      id: "box-dickens-cacace-2026-03-14",
      promotion: "DAZN",
      event: "Jazza Dickens vs. Anthony Cacace",
      date: "2026-03-14T19:00:00Z",
      time_utc: "2026-03-14T19:00:00Z",
      venue: "3Arena, Dublin, Ireland",
      main_event: "Jazza Dickens vs. Anthony Cacace (WBA Super Featherweight Title)",
      broadcast: "DAZN"
    }
    // Add more March cards as needed
  ]
};
