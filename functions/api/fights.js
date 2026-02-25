export async function onRequestGet(context) {
  const upcomingFights = {
    ufc: [
      {
        id: "ufc-fn-strickland-2026-02-21",
        promotion: "UFC",
        event: "UFC Fight Night: Strickland vs. Hernandez",
        date: "2026-02-21T02:00:00Z",
        time_utc: "2026-02-21T02:00:00Z",
        venue: "Toyota Center",
        location: "Houston, TX, USA",
        main_event: "Sean Strickland vs. Anthony Hernandez (Middleweight)",
        broadcast: "Paramount+",
        card: [
          { bout: "main",   f1: "Sean Strickland",    f1_record: "29-6",  f2: "Anthony Hernandez", f2_record: "13-2",  weight: "Middleweight",        rounds: 5 },
          { bout: "co",     f1: "Reinier de Ridder",  f1_record: "17-3",  f2: "Caio Borralho",     f2_record: "16-2",  weight: "Middleweight",        rounds: 3 },
          { bout: "main",   f1: "Mackenzie Dern",     f1_record: "13-5",  f2: "Virna Jandiroba",   f2_record: "21-4",  weight: "Women's Strawweight", rounds: 3 },
          { bout: "main",   f1: "Josh Quinlan",       f1_record: "9-1",   f2: "Carlston Harris",   f2_record: "20-5",  weight: "Welterweight",        rounds: 3 },
          { bout: "main",   f1: "Davey Grant",        f1_record: "18-8",  f2: "Vince Morales",     f2_record: "12-5",  weight: "Bantamweight",        rounds: 3 },
          { bout: "prelim", f1: "Billy Quarantillo",  f1_record: "19-6",  f2: "Joanderson Brito",  f2_record: "18-4",  weight: "Featherweight",       rounds: 3 },
          { bout: "prelim", f1: "Marc-Andre Barriault",f1_record:"18-6",  f2: "Sedriques Dumas",   f2_record: "10-2",  weight: "Middleweight",        rounds: 3 },
          { bout: "prelim", f1: "Tresean Gore",       f1_record: "7-3",   f2: "AJ Fletcher",       f2_record: "9-0",   weight: "Middleweight",        rounds: 3 },
          { bout: "prelim", f1: "Nazim Sadykhov",     f1_record: "11-0",  f2: "Jack Shore",        f2_record: "17-3",  weight: "Bantamweight",        rounds: 3 },
        ]
      },
      {
        id: "ufc-fn-moreno-2026-02-28",
        promotion: "UFC",
        event: "UFC Fight Night: Moreno vs. Kavanagh",
        date: "2026-02-28T01:00:00Z",
        time_utc: "2026-02-28T01:00:00Z",
        venue: "Arena CDMX",
        location: "Mexico City, Mexico",
        main_event: "Brandon Moreno vs. Lone'er Kavanagh (Flyweight)",
        broadcast: "Paramount+",
        card: [
          { bout: "main",   f1: "Brandon Moreno",     f1_record: "22-7-1", f2: "Lone'er Kavanagh",  f2_record: "10-2",  weight: "Flyweight",               rounds: 5 },
          { bout: "co",     f1: "Marlon Vera",        f1_record: "22-9",   f2: "David Martínez",    f2_record: "16-5",  weight: "Bantamweight",            rounds: 3 },
          { bout: "main",   f1: "Daniel Zellhuber",   f1_record: "16-3",   f2: "King Green",        f2_record: "30-15", weight: "Lightweight",             rounds: 3 },
          { bout: "main",   f1: "Edgar Cháirez",      f1_record: "13-4",   f2: "Felipe Bunes",      f2_record: "12-3",  weight: "Flyweight",               rounds: 3 },
          { bout: "main",   f1: "Imanol Rodriguez",   f1_record: "14-4",   f2: "Kevin Borjas",      f2_record: "11-3",  weight: "Flyweight",               rounds: 3 },
          { bout: "main",   f1: "Santiago Luna",      f1_record: "11-2",   f2: "Angel Pacheco",     f2_record: "9-3",   weight: "Bantamweight",            rounds: 3 },
          { bout: "prelim", f1: "Ryan Gandra",        f1_record: "8-2",    f2: "José D. Medina",    f2_record: "13-5",  weight: "Middleweight",            rounds: 3 },
          { bout: "prelim", f1: "Ailín Pérez",        f1_record: "13-4",   f2: "Macy Chiasson",     f2_record: "11-4",  weight: "Women's Bantamweight",    rounds: 3 },
          { bout: "prelim", f1: "Cristian Quiñonez",  f1_record: "14-5",   f2: "Kris Moutinho",     f2_record: "12-8",  weight: "Bantamweight",            rounds: 3 },
          { bout: "prelim", f1: "D.S. de Andrade",    f1_record: "28-8",   f2: "Javier Reyes",      f2_record: "10-4",  weight: "Bantamweight",            rounds: 3 },
          { bout: "early",  f1: "Ernesta Kareckaitė", f1_record: "6-2",    f2: "Sofia Montenegro",  f2_record: "5-1",   weight: "Women's Flyweight",       rounds: 3 },
        ]
      },
      {
        id: "ufc-326-2026-03-07",
        promotion: "UFC",
        event: "UFC 326: Holloway vs. Oliveira 2",
        date: "2026-03-08T02:00:00Z",
        time_utc: "2026-03-08T02:00:00Z",
        venue: "T-Mobile Arena",
        location: "Las Vegas, NV, USA",
        main_event: "Max Holloway vs. Charles Oliveira 2 (Lightweight – BMF Title)",
        broadcast: "Paramount+ / CBS",
        card: [
          { bout: "main",   f1: "Max Holloway",       f1_record: "27-8",  f2: "Charles Oliveira",   f2_record: "34-10", weight: "Lightweight – BMF Title", rounds: 5 },
          { bout: "co",     f1: "Renato Moicano",     f1_record: "20-6-1",f2: "Brian Ortega",        f2_record: "16-4",  weight: "Lightweight",             rounds: 3 },
          { bout: "main",   f1: "Caio Borralho",      f1_record: "16-2",  f2: "Reinier de Ridder",  f2_record: "16-4",  weight: "Middleweight",            rounds: 3 },
          { bout: "main",   f1: "Gregory Rodrigues",  f1_record: "16-6",  f2: "Brunno Ferreira",    f2_record: "12-3",  weight: "Middleweight",            rounds: 3 },
          { bout: "main",   f1: "Rob Font",           f1_record: "20-8",  f2: "Raul Rosas Jr.",     f2_record: "10-2",  weight: "Bantamweight",            rounds: 3 },
          { bout: "prelim", f1: "Drew Dober",         f1_record: "26-14", f2: "Michael Johnson",    f2_record: "24-18", weight: "Lightweight",             rounds: 3 },
          { bout: "prelim", f1: "Cody Durden",        f1_record: "17-5",  f2: "N. Tumendemberel",   f2_record: "9-3",   weight: "Flyweight",               rounds: 3 },
          { bout: "prelim", f1: "Cody Garbrandt",     f1_record: "13-6",  f2: "Long Xiao",          f2_record: "18-7",  weight: "Bantamweight",            rounds: 3 },
          { bout: "prelim", f1: "Donte Johnson",      f1_record: "9-2",   f2: "Duško Todorović",    f2_record: "12-5",  weight: "Middleweight",            rounds: 3 },
          { bout: "early",  f1: "Rafael Tobias",      f1_record: "12-3",  f2: "Diyar Nurgozhay",    f2_record: "13-4",  weight: "Light Heavyweight",       rounds: 3 },
          { bout: "early",  f1: "Luke Fernandez",     f1_record: "9-1",   f2: "Rodolfo Bellato",    f2_record: "15-4",  weight: "Light Heavyweight",       rounds: 3 },
          { bout: "early",  f1: "Sumudaerji",         f1_record: "22-6",  f2: "Jesus Aguilar",      f2_record: "11-3",  weight: "Flyweight",               rounds: 3 },
          { bout: "early",  f1: "Alberto Montes",     f1_record: "11-4",  f2: "Ricky Turcios",      f2_record: "14-5",  weight: "Featherweight",           rounds: 3 },
        ]
      },
      {
        id: "ufc-fn-emmett-2026-03-14",
        promotion: "UFC",
        event: "UFC Fight Night: Emmett vs. Vallejos",
        date: "2026-03-15T00:00:00Z",
        time_utc: "2026-03-15T00:00:00Z",
        venue: "Meta APEX",
        location: "Las Vegas, NV, USA",
        main_event: "Josh Emmett vs. Kevin Vallejos (Featherweight)",
        broadcast: "Paramount+",
        card: [
          { bout: "main",   f1: "Josh Emmett",        f1_record: "19-6",  f2: "Kevin Vallejos",     f2_record: "17-1",  weight: "Featherweight",           rounds: 5 },
          { bout: "co",     f1: "Amanda Lemos",       f1_record: "15-5",  f2: "Gillian Robertson",  f2_record: "12-7",  weight: "Women's Strawweight",     rounds: 3 },
          { bout: "main",   f1: "Oumar Sy",           f1_record: "9-1",   f2: "Ion Cutelaba",       f2_record: "16-8",  weight: "Light Heavyweight",       rounds: 3 },
          { bout: "main",   f1: "Chris Curtis",       f1_record: "32-10", f2: "M. Orolbai",         f2_record: "8-3",   weight: "Welterweight",            rounds: 3 },
          { bout: "main",   f1: "Vitor Petrino",      f1_record: "14-2",  f2: "Steven Asplund",     f2_record: "10-2",  weight: "Heavyweight",             rounds: 3 },
          { bout: "main",   f1: "Bruno Silva",        f1_record: "22-8",  f2: "Charles Johnson",    f2_record: "13-4",  weight: "Flyweight",               rounds: 3 },
          { bout: "prelim", f1: "Bia Mesquita",       f1_record: "8-2",   f2: "Montserrat Rendon",  f2_record: "6-4",   weight: "Women's Bantamweight",    rounds: 3 },
          { bout: "prelim", f1: "Brad Tavares",       f1_record: "20-11", f2: "Eryk Anders",        f2_record: "15-9",  weight: "Middleweight",            rounds: 3 },
          { bout: "prelim", f1: "Elijah Smith",       f1_record: "10-2",  f2: "Su Young You",       f2_record: "14-5",  weight: "Bantamweight",            rounds: 3 },
          { bout: "prelim", f1: "Marwan Rahiki",      f1_record: "7-1",   f2: "Harry Hardwick",     f2_record: "8-3",   weight: "Featherweight",           rounds: 3 },
          { bout: "early",  f1: "Piera Rodriguez",    f1_record: "11-4",  f2: "Sam Hughes",         f2_record: "9-5",   weight: "Women's Strawweight",     rounds: 3 },
          { bout: "early",  f1: "Luan Lacerda",       f1_record: "12-3",  f2: "Hecher Sosa",        f2_record: "9-2",   weight: "Bantamweight",            rounds: 3 },
          { bout: "early",  f1: "Bolaji Oki",         f1_record: "7-2",   f2: "Manoel Sousa",       f2_record: "8-4",   weight: "Lightweight",             rounds: 3 },
        ]
      },
      {
        id: "ufc-fn-evloev-2026-03-21",
        promotion: "UFC",
        event: "UFC Fight Night: Evloev vs. Murphy",
        date: "2026-03-21T20:00:00Z",
        time_utc: "2026-03-21T20:00:00Z",
        venue: "The O2 Arena",
        location: "London, England",
        main_event: "Movsar Evloev vs. Lerone Murphy (Featherweight – Title Eliminator)",
        broadcast: "Paramount+",
        card: [
          { bout: "main",   f1: "Movsar Evloev",      f1_record: "19-0",  f2: "Lerone Murphy",      f2_record: "17-0-1",weight: "Featherweight – Title Eliminator", rounds: 5 },
          { bout: "co",     f1: "Luke Riley",         f1_record: "12-0",  f2: "Michael Aswell",     f2_record: "11-3",  weight: "Featherweight",           rounds: 3 },
          { bout: "main",   f1: "Michael Page",       f1_record: "22-4",  f2: "Sam Patterson",      f2_record: "10-2",  weight: "Welterweight",            rounds: 3 },
          { bout: "main",   f1: "Iwo Baraniewski",    f1_record: "15-2",  f2: "Austen Lane",        f2_record: "17-9",  weight: "Light Heavyweight",       rounds: 3 },
          { bout: "main",   f1: "Roman Dolidze",      f1_record: "13-4",  f2: "C.L. Duncan",        f2_record: "15-2",  weight: "Middleweight",            rounds: 3 },
          { bout: "main",   f1: "Kurtis Campbell",    f1_record: "14-5",  f2: "Danny Silva",        f2_record: "13-3",  weight: "Featherweight",           rounds: 3 },
          { bout: "prelim", f1: "Mason Jones",        f1_record: "13-3",  f2: "Axel Sola",          f2_record: "11-3",  weight: "Lightweight",             rounds: 3 },
          { bout: "prelim", f1: "Shanelle Dyer",      f1_record: "7-2",   f2: "Ravena Oliveira",    f2_record: "9-4",   weight: "Women's Strawweight",     rounds: 3 },
          { bout: "prelim", f1: "Nathaniel Wood",     f1_record: "21-6",  f2: "Losene Keita",       f2_record: "12-3",  weight: "Featherweight",           rounds: 3 },
          { bout: "prelim", f1: "Louie Sutherland",   f1_record: "15-5",  f2: "Brando Peričić",     f2_record: "9-3",   weight: "Heavyweight",             rounds: 3 },
          { bout: "early",  f1: "Mantas K.",          f1_record: "12-4",  f2: "Antonio Trócoli",    f2_record: "11-5",  weight: "Middleweight",            rounds: 3 },
          { bout: "early",  f1: "Mick Parkin",        f1_record: "10-1",  f2: "Mario Pinto",        f2_record: "9-0",   weight: "Heavyweight",             rounds: 3 },
          { bout: "early",  f1: "Shaqueme Rock",      f1_record: "7-2",   f2: "A. Al-Selwady",      f2_record: "8-3",   weight: "Lightweight",             rounds: 3 },
          { bout: "early",  f1: "Melissa Mullins",    f1_record: "8-3",   f2: "Luana Carolina",     f2_record: "10-4",  weight: "Women's Bantamweight",    rounds: 3 },
        ]
      },
      {
        id: "ufc-fn-adesanya-2026-03-28",
        promotion: "UFC",
        event: "UFC Fight Night: Adesanya vs. Pyfer",
        date: "2026-03-29T00:00:00Z",
        time_utc: "2026-03-29T00:00:00Z",
        venue: "Climate Pledge Arena",
        location: "Seattle, WA, USA",
        main_event: "Israel Adesanya vs. Joe Pyfer (Middleweight)",
        broadcast: "Paramount+",
        card: [
          { bout: "main",   f1: "Israel Adesanya",    f1_record: "24-5",  f2: "Joe Pyfer",          f2_record: "15-3",  weight: "Middleweight",            rounds: 5 },
          { bout: "co",     f1: "Alexa Grasso",       f1_record: "16-5-1",f2: "Maycee Barber",      f2_record: "16-3",  weight: "Women's Flyweight",       rounds: 5 },
          { bout: "main",   f1: "Casey O'Neill",      f1_record: "11-2",  f2: "G. Fernandes",       f2_record: "10-3",  weight: "Women's Flyweight",       rounds: 3 },
          { bout: "main",   f1: "Marcin Tybura",      f1_record: "26-8",  f2: "Valter Walker",      f2_record: "12-2",  weight: "Heavyweight",             rounds: 3 },
          { bout: "main",   f1: "Michael Chiesa",     f1_record: "19-7",  f2: "C. Harris",          f2_record: "14-5",  weight: "Welterweight",            rounds: 3 },
          { bout: "main",   f1: "Trevin McKinney",    f1_record: "16-5",  f2: "Kyle Nelson",        f2_record: "17-9",  weight: "Lightweight",             rounds: 3 },
          { bout: "prelim", f1: "M. Abdul-Malik",     f1_record: "10-2",  f2: "Y. Belgaroui",       f2_record: "9-3",   weight: "Middleweight",            rounds: 3 },
          { bout: "prelim", f1: "Kangjie Zhu",        f1_record: "17-3",  f2: "Márcio Barbosa",     f2_record: "13-5",  weight: "Featherweight",           rounds: 3 },
          { bout: "prelim", f1: "Julian Erosa",       f1_record: "30-11", f2: "L. Douglas",         f2_record: "10-2",  weight: "Featherweight",           rounds: 3 },
        ]
      },
      {
        id: "ufc-fn-moicano-2026-04-04",
        promotion: "UFC",
        event: "UFC Fight Night: Moicano vs. Duncan",
        date: "2026-04-05T00:00:00Z",
        time_utc: "2026-04-05T00:00:00Z",
        venue: "UFC APEX",
        location: "Las Vegas, NV, USA",
        main_event: "Renato Moicano vs. Chris Duncan (Lightweight)",
        broadcast: "Paramount+",
        card: [
          { bout: "main",   f1: "Renato Moicano",     f1_record: "20-7-1",f2: "Chris Duncan",       f2_record: "15-2",  weight: "Lightweight",             rounds: 5 },
        ]
      },
      {
        id: "ufc-327-2026-04-11",
        promotion: "UFC",
        event: "UFC 327: Van vs. Taira",
        date: "2026-04-12T02:00:00Z",
        time_utc: "2026-04-12T02:00:00Z",
        venue: "Kaseya Center",
        location: "Miami, FL, USA",
        main_event: "Joshua Van vs. Tatsuro Taira (Flyweight Title)",
        broadcast: "Paramount+",
        card: [
          { bout: "main",   f1: "Joshua Van",         f1_record: "16-2",  f2: "Tatsuro Taira",      f2_record: "18-1",  weight: "Flyweight Title",         rounds: 5 },
        ]
      }
    ],
    boxing: [
      {
        id: "box-opetaia-2026-03-08",
        promotion: "Zuffa Boxing",
        event: "Zuffa Boxing 4: Opetaia vs. Glanton",
        date: "2026-03-08T02:00:00Z",
        time_utc: "2026-03-08T02:00:00Z",
        venue: "Meta APEX",
        location: "Las Vegas, NV, USA",
        main_event: "Jai Opetaia vs. Brandon Glanton (Cruiserweight)",
        broadcast: "Paramount+",
        card: [
          { bout: "main",   f1: "Jai Opetaia",        f1_record: "25-0",  f2: "Brandon Glanton",    f2_record: "18-2",  weight: "Cruiserweight",           rounds: 12 },
        ]
      },
      {
        id: "box-dickens-cacace-2026-03-14",
        promotion: "DAZN",
        event: "Dickens vs. Cacace",
        date: "2026-03-14T19:00:00Z",
        time_utc: "2026-03-14T19:00:00Z",
        venue: "3Arena",
        location: "Dublin, Ireland",
        main_event: "Jazza Dickens vs. Anthony Cacace (Super Featherweight)",
        broadcast: "DAZN",
        card: [
          { bout: "main",   f1: "Jazza Dickens",      f1_record: "32-4",  f2: "Anthony Cacace",     f2_record: "24-2",  weight: "Super Featherweight",     rounds: 12 },
        ]
      },
      {
        id: "box-chisora-wilder-2026-04-04",
        promotion: "DAZN",
        event: "Chisora vs. Wilder",
        date: "2026-04-04T16:00:00Z",
        time_utc: "2026-04-04T16:00:00Z",
        venue: "The O2 Arena",
        location: "London, England",
        main_event: "Derek Chisora vs. Deontay Wilder (Heavyweight)",
        broadcast: "DAZN",
        card: [
          { bout: "main",   f1: "Derek Chisora",      f1_record: "34-14", f2: "Deontay Wilder",     f2_record: "43-4-1",weight: "Heavyweight",             rounds: 12 },
        ]
      },
      {
        id: "box-smith-morrell-2026-04-18",
        promotion: "DAZN",
        event: "Smith vs. Morrell",
        date: "2026-04-18T19:00:00Z",
        time_utc: "2026-04-18T19:00:00Z",
        venue: "M&S Bank Arena",
        location: "Liverpool, England",
        main_event: "Callum Smith vs. David Morrell (Light Heavyweight)",
        broadcast: "DAZN",
        card: [
          { bout: "main",   f1: "Callum Smith",       f1_record: "29-2",  f2: "David Morrell",      f2_record: "11-0",  weight: "Light Heavyweight",       rounds: 12 },
        ]
      },
      {
        id: "box-benavidez-ramirez-2026-05-02",
        promotion: "Premier Boxing Champions",
        event: "Ramirez vs. Benavidez",
        date: "2026-05-02T02:00:00Z",
        time_utc: "2026-05-02T02:00:00Z",
        venue: "T-Mobile Arena",
        location: "Las Vegas, NV, USA",
        main_event: "Gilberto Ramirez vs. David Benavidez (Cruiserweight Titles)",
        broadcast: "Prime Video PPV",
        card: [
          { bout: "main",   f1: "Gilberto Ramirez",   f1_record: "46-0",  f2: "David Benavidez",    f2_record: "29-0",  weight: "Cruiserweight Titles",    rounds: 12 },
        ]
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
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}
