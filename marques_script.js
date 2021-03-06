const firebase = require("firebase");

/*const firebaseConfig = {
  apiKey: "AIzaSyDfRqLw_maATHpGVqO4nxcmHw_asxc0c60",
  authDomain: "kval-c264a.firebaseapp.com",
  projectId: "kval-c264a",
  storageBucket: "kval-c264a.appspot.com",
  messagingSenderId: "692297808431",
  appId: "1:692297808431:web:d17649aabc7a6700f024da",
  measurementId: "G-EDTT5RXHJ2",
};*/

const firebaseConfig2 = {
  apiKey: "AIzaSyCkee21-SCCNxfS6co9SjW-PNfLTFTkdec",
  authDomain: "kval-occaz.firebaseapp.com",
  projectId: "kval-occaz",
  storageBucket: "kval-occaz.appspot.com",
  messagingSenderId: "40095874290",
  appId: "1:40095874290:web:9ae177535c519f10ec646b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig2);

async function main() {
  const marques = [
    "Absorbine",
    "Adelar",
    "After Riding",
    "Akene",
    "Albion",
    "Alliance Equine",
    "Alodis Care",
    "Amerigo",
    "Animo Italia",
    "Anna Scarpati",
    "Antares",
    "Antares Sellier",
    "Apollo",
    "Autres marques",
    "Axxel",
    "Back on Track",
    "Bamboo",
    "Bates",
    "Beaumont",
    "Belstar",
    "Beris",
    "Billybelt",
    "Bockmann",
    "Borstiq farm",
    "Butet",
    "CSO",
    "CWD",
    "Canter",
    "Carr & Day & Martin",
    "Casco",
    "Cavaline",
    "Cavalleria Toscana",
    "Cavallo",
    "Charles Owen",
    "Chetak",
    "Chetak",
    "Cheval Liberté",
    "Childeric",
    "Choplin",
    "Choplin",
    "Collection Equine",
    "Collorado Springs",
    "Compositi",
    "Continental",
    "Dance With Him",
    "Delgrange",
    "Devoucoux",
    "Diego & Louna",
    "Dyon",
    "ES stockholm",
    "Effax",
    "Effol",
    "Ego7",
    "Ekkia",
    "Equerry",
    "Equestrian Stockholm",
    "EquiTrek",
    "Equiconfort",
    "Equidura",
    "Equikids",
    "Equilibrium",
    "Equilibrium",
    "Equiline",
    "Equiline",
    "Equinatura",
    "Equipe",
    "Equithème",
    "Equizor",
    "Eric Thomas",
    "Eric Thomas",
    "Eric le Tixerant",
    "Eskadron",
    "Eskadron",
    "Euroriding",
    "Excelsior",
    "FFE",
    "Fautras",
    "Feeling",
    "Feeling",
    "Flags & Cup",
    "Fleck",
    "Flex On",
    "Forestier",
    "Fouganza",
    "France cheval",
    "Freejump",
    "Freemax",
    "Fynalite",
    "GBS Sellier",
    "GEM",
    "GPA",
    "Galo’Snack",
    "Gaston Mercier",
    "Grooming Deluxe",
    "Guy Cantin",
    "HDCP friandises pour chevaux",
    "HFI",
    "HKM",
    "HV polo",
    "Haf",
    "Hagg",
    "Happy Ross",
    "Happy mouth",
    "Harcour",
    "Heiniger",
    "Heiniger",
    "Hekktor Leather",
    "Helite",
    "Henri de Rivel",
    "Heritage",
    "Hermès",
    "Hervé Godignon",
    "Hexa",
    "Hey Sport",
    "Hippotonic",
    "Hit Air",
    "Horse Pilot",
    "Horseware",
    "Horseware",
    "Horze",
    "Hydrophane",
    "Hästko",
    "Ice Vibe",
    "Ifor Williams",
    "Inatake",
    "Jean d’Autigny",
    "Jin Stittups",
    "John Witaker",
    "Jump Your Hair",
    "Jumptec",
    "Jump’In",
    "Karitale",
    "Kazak Sport",
    "Kennedy Equi Products",
    "Kentucky Horsewear",
    "Kep Italia",
    "Kevin Bacon’s",
    "Kieffer",
    "Kingsland",
    "Kris",
    "LAS",
    "Lamicell",
    "Laporatoire LPC",
    "Le Sabotier",
    "LeMieux",
    "Leovet",
    "Lexington",
    "Likit",
    "Lister",
    "Lorenzini",
    "Macel",
    "Marjoman",
    "Mattes",
    "Metalab",
    "Meyer",
    "Michel Vaillant",
    "Mondage",
    "NAF",
    "Nacricare",
    "Nathe",
    "Natural’ Innov",
    "Norton",
    "Officinalis",
    "Ogilvy Equestrian",
    "Onguent du Maréchal",
    "Optimum Time",
    "Orscana",
    "Oscar & Gabrielle",
    "Oxxer",
    "Paddock Sports",
    "Paskacheval",
    "Performance",
    "Pessoa",
    "Phoenix",
    "Pikeur",
    "Podium",
    "Prestige Italia",
    "Privilège Equitation",
    "Pro Series",
    "Professional’s choice",
    "Protanner",
    "Pénélope Leprevost",
    "RG Italy",
    "Rambo",
    "Randol’s",
    "Rapide",
    "Ravene",
    "Rekor",
    "Respire",
    "Reverdy",
    "Riding World",
    "Riding world",
    "Roeckl",
    "Ronzon",
    "SAPO",
    "STX",
    "Samshield",
    "Seaver horse",
    "Segura",
    "Silver crown",
    "Sprenger",
    "Stassek",
    "Stubben",
    "Swing",
    "TRC 85",
    "Tattini",
    "TdeT",
    "Terrys",
    "Tucci",
    "Uncle Jimmy’s",
    "Ungula Naturalis",
    "Uvex",
    "Veredus",
    "Vigot",
    "Waldhausen",
    "Weatherbeeta",
    "Westfalia",
    "Whup&Go",
    "Wintec",
    "Zaldi",
    "Zandona",
    "treadstone",
  ];
  marques.map((marque) => {
    firebase.firestore().collection("Marques").add({ name: marque });
  });
}

main();
