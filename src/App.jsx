import { useState, useEffect, useRef } from "react";

// ================= DATE: LECȚIILE ZILNICE (rotație pe zile) =================
const LECTII_ZILNICE = [
  {
    titlu: "Fraze de bază la muncă",
    fraze: [
      { en: "Can you help me, please?", fon: "chen iu help mi, plis?", ro: "Mă poți ajuta, te rog?" },
      { en: "I don't understand.", fon: "ai dont anderstend", ro: "Nu înțeleg." },
      { en: "Can you repeat, please?", fon: "chen iu ripit, plis?", ro: "Poți repeta, te rog?" },
      { en: "One moment, please.", fon: "uan moment, plis", ro: "Un moment, te rog." },
      { en: "I will finish this today.", fon: "ai uil finiș dis tudei", ro: "Termin asta astăzi." },
      { en: "Thank you very much!", fon: "tenchiu veri maci!", ro: "Mulțumesc foarte mult!" },
    ],
  },
  {
    titlu: "Salutări și cunoștințe",
    fraze: [
      { en: "Good morning!", fon: "gud morning!", ro: "Bună dimineața!" },
      { en: "How are you today?", fon: "hau ar iu tudei?", ro: "Ce mai faci azi?" },
      { en: "I'm fine, thank you.", fon: "aim fain, tenchiu", ro: "Sunt bine, mulțumesc." },
      { en: "Nice to see you!", fon: "nais tu si iu!", ro: "Mă bucur să te văd!" },
      { en: "My name is Maria.", fon: "mai neim iz Maria", ro: "Mă numesc Maria." },
      { en: "See you later!", fon: "si iu leităr!", ro: "Pe mai târziu!" },
    ],
  },
  {
    titlu: "La cumpărături",
    fraze: [
      { en: "How much is it?", fon: "hau maci iz it?", ro: "Cât costă?" },
      { en: "Do you have milk?", fon: "du iu hev milc?", ro: "Aveți lapte?" },
      { en: "I'm just looking, thanks.", fon: "aim geast lúching, tencs", ro: "Doar mă uit, mulțumesc." },
      { en: "Can I pay by card?", fon: "chen ai pei bai card?", ro: "Pot plăti cu cardul?" },
      { en: "Where is the bread?", fon: "uer iz dă bred?", ro: "Unde e pâinea?" },
      { en: "A receipt, please.", fon: "a risíit, plis", ro: "Un bon, vă rog." },
    ],
  },
  {
    titlu: "Politețea de zi cu zi",
    fraze: [
      { en: "Excuse me.", fon: "exchiúz mi", ro: "Scuzați-mă." },
      { en: "I'm sorry.", fon: "aim sori", ro: "Îmi pare rău." },
      { en: "No problem.", fon: "nou problém", ro: "Nicio problemă." },
      { en: "You're welcome.", fon: "ior uélcam", ro: "Cu plăcere." },
      { en: "After you.", fon: "aftăr iu", ro: "După dumneavoastră." },
      { en: "Thank you for your help.", fon: "tenchiu for ior help", ro: "Mulțumesc pentru ajutor." },
    ],
  },
  {
    titlu: "Despre tine",
    fraze: [
      { en: "I'm from Romania.", fon: "aim from Romeinia", ro: "Sunt din România." },
      { en: "I live here.", fon: "ai liv hir", ro: "Locuiesc aici." },
      { en: "I have two children.", fon: "ai hev tu cildrăn", ro: "Am doi copii." },
      { en: "I'm learning English.", fon: "aim lărning ingliș", ro: "Învăț engleza." },
      { en: "I like my job.", fon: "ai laic mai giob", ro: "Îmi place jobul meu." },
      { en: "I love cooking.", fon: "ai lav cúching", ro: "Ador să gătesc." },
    ],
  },
  {
    titlu: "Cum ceri ajutor cu engleza",
    fraze: [
      { en: "Can you speak slower, please?", fon: "chen iu spiic slóuăr, plis?", ro: "Puteți vorbi mai rar, vă rog?" },
      { en: "How do you say this in English?", fon: "hau du iu sei dis in ingliș?", ro: "Cum se spune asta în engleză?" },
      { en: "What does it mean?", fon: "uot daz it miin?", ro: "Ce înseamnă?" },
      { en: "Can you write it down?", fon: "chen iu rait it daun?", ro: "Puteți să mi-o scrieți?" },
      { en: "I'm still learning.", fon: "aim stil lărning", ro: "Încă învăț." },
      { en: "Thank you for your patience.", fon: "tenchiu for ior péișens", ro: "Mulțumesc pentru răbdare." },
    ],
  },
  {
    titlu: "La telefon",
    fraze: [
      { en: "Hello, this is Maria.", fon: "helou, dis iz Maria", ro: "Alo, sunt Maria." },
      { en: "Who is calling?", fon: "hu iz cóling?", ro: "Cine sună?" },
      { en: "One moment, please.", fon: "uan moment, plis", ro: "Un moment, vă rog." },
      { en: "Can you call back later?", fon: "chen iu col bec leităr?", ro: "Puteți suna mai târziu?" },
      { en: "I can't hear you well.", fon: "ai chent hir iu uel", ro: "Nu vă aud bine." },
      { en: "Have a nice day!", fon: "hev a nais dei!", ro: "O zi frumoasă!" },
    ],
  },
  {
    titlu: "Ora și planurile",
    fraze: [
      { en: "What time is it?", fon: "uot taim iz it?", ro: "Cât e ceasul?" },
      { en: "I start at eight.", fon: "ai start et eit", ro: "Încep la opt." },
      { en: "I finish at five.", fon: "ai finiș et faiv", ro: "Termin la cinci." },
      { en: "See you tomorrow at nine.", fon: "si iu tumorou et nain", ro: "Ne vedem mâine la nouă." },
      { en: "I'm free on Sunday.", fon: "aim fri on sandei", ro: "Sunt liberă duminică." },
      { en: "Let's meet at noon.", fon: "lets miit et nuun", ro: "Să ne vedem la prânz." },
    ],
  },
  {
    titlu: "Sănătate și urgențe",
    fraze: [
      { en: "I don't feel well.", fon: "ai dont fiil uel", ro: "Nu mă simt bine." },
      { en: "I need a doctor.", fon: "ai niid a doctăr", ro: "Am nevoie de un doctor." },
      { en: "It hurts here.", fon: "it hărts hir", ro: "Mă doare aici." },
      { en: "Call an ambulance, please!", fon: "col en émbiulans, plis!", ro: "Chemați o ambulanță, vă rog!" },
      { en: "I need my medicine.", fon: "ai niid mai médisin", ro: "Am nevoie de medicamentul meu." },
      { en: "I feel better now.", fon: "ai fiil betăr nau", ro: "Mă simt mai bine acum." },
    ],
  },
  {
    titlu: "Mulțumiri și rămas-bun",
    fraze: [
      { en: "Thank you so much!", fon: "tenchiu sou maci!", ro: "Mulțumesc din suflet!" },
      { en: "I really appreciate it.", fon: "ai ríli aprișieit it", ro: "Apreciez cu adevărat." },
      { en: "It was nice talking to you.", fon: "it uoz nais tóching tu iu", ro: "Mi-a făcut plăcere să vorbim." },
      { en: "Take care!", fon: "teic cher!", ro: "Ai grijă de tine!" },
      { en: "Good luck!", fon: "gud lac!", ro: "Succes!" },
      { en: "See you soon!", fon: "si iu suun!", ro: "Pe curând!" },
    ],
  },
];

// Aceeași lecție toată ziua, alta mâine — rotație automată (după data locală)
function lectiaZilei() {
  const d = new Date();
  const nrZi = d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate();
  return LECTII_ZILNICE[nrZi % LECTII_ZILNICE.length];
}

const FRAZE_UTILE = {
  "La muncă 💼": [
    { en: "Good morning, everyone!", fon: "gud morning, evriuan!", ro: "Bună dimineața tuturor!" },
    { en: "I have a question.", fon: "ai hev a cuescion", ro: "Am o întrebare." },
    { en: "Where is the manager?", fon: "uer iz dă menager?", ro: "Unde este managerul?" },
    { en: "I am ready.", fon: "ai em redi", ro: "Sunt gata." },
    { en: "I'll be right back.", fon: "ail bi rait bec", ro: "Mă întorc imediat." },
    { en: "Is this correct?", fon: "iz dis coréct?", ro: "E corect așa?" },
    { en: "I need help with this.", fon: "ai niid help uit dis", ro: "Am nevoie de ajutor cu asta." },
    { en: "When is the deadline?", fon: "uen iz dă dédlain?", ro: "Când e termenul limită?" },
    { en: "I'm on my break.", fon: "aim on mai breic", ro: "Sunt în pauză." },
    { en: "See you tomorrow!", fon: "si iu tumorou!", ro: "Ne vedem mâine!" },
  ],
  "La doctor 🩺": [
    { en: "I need to see a doctor.", fon: "ai niid tu si a doctăr", ro: "Trebuie să văd un doctor." },
    { en: "I have a headache.", fon: "ai hev a hédeic", ro: "Mă doare capul." },
    { en: "I have a fever.", fon: "ai hev a fívăr", ro: "Am febră." },
    { en: "My stomach hurts.", fon: "mai stómac hărts", ro: "Mă doare stomacul." },
    { en: "I'm allergic to this.", fon: "aim alérgic tu dis", ro: "Sunt alergică la asta." },
    { en: "I take blood pressure medicine.", fon: "ai teic blad préșăr médisin", ro: "Iau medicamente de tensiune." },
    { en: "How often should I take it?", fon: "hau ofăn șud ai teic it?", ro: "Cât de des să-l iau?" },
    { en: "Do I need a prescription?", fon: "du ai niid a prescrípșăn?", ro: "Am nevoie de rețetă?" },
    { en: "I feel dizzy.", fon: "ai fiil dizi", ro: "Am amețeli." },
    { en: "Is it serious?", fon: "iz it síriăs?", ro: "E grav?" },
    { en: "Where is the pharmacy?", fon: "uer iz dă fármăsi?", ro: "Unde e farmacia?" },
    { en: "Get well soon!", fon: "get uel suun!", ro: "Însănătoșire grabnică!" },
  ],
  "La magazin 🛒": [
    { en: "How much is it?", fon: "hau maci iz it?", ro: "Cât costă?" },
    { en: "Where can I find bread?", fon: "uer chen ai faind bred?", ro: "Unde găsesc pâine?" },
    { en: "Can I pay by card?", fon: "chen ai pei bai card?", ro: "Pot plăti cu cardul?" },
    { en: "A bag, please.", fon: "a beg, plis", ro: "O pungă, vă rog." },
    { en: "Do you have a smaller size?", fon: "du iu hev a smolăr saiz?", ro: "Aveți o mărime mai mică?" },
    { en: "Where is the cash register?", fon: "uer iz dă cheș régistăr?", ro: "Unde e casa?" },
    { en: "It's too expensive.", fon: "its tu expénsiv", ro: "E prea scump." },
    { en: "I'll take it.", fon: "ail teic it", ro: "Îl iau." },
    { en: "Can I return this?", fon: "chen ai ritărn dis?", ro: "Pot returna asta?" },
  ],
  "La restaurant ☕": [
    { en: "A table for two, please.", fon: "a teibăl for tu, plis", ro: "O masă pentru două persoane, vă rog." },
    { en: "The menu, please.", fon: "dă méniu, plis", ro: "Meniul, vă rog." },
    { en: "What do you recommend?", fon: "uot du iu recoménd?", ro: "Ce ne recomandați?" },
    { en: "I would like the chicken.", fon: "ai uud laic dă cichin", ro: "Aș dori puiul." },
    { en: "No sugar, please.", fon: "nou șugăr, plis", ro: "Fără zahăr, vă rog." },
    { en: "It's delicious!", fon: "its delíșăs!", ro: "E delicios!" },
    { en: "The bill, please.", fon: "dă bil, plis", ro: "Nota, vă rog." },
    { en: "A glass of water, please.", fon: "a glas ov uótăr, plis", ro: "Un pahar cu apă, vă rog." },
    { en: "Is service included?", fon: "iz sărvis inclúdid?", ro: "Bacșișul e inclus?" },
    { en: "To go, please.", fon: "tu gou, plis", ro: "La pachet, vă rog." },
  ],
  "Direcții și transport 🚌": [
    { en: "How do I get to the station?", fon: "hau du ai get tu dă steișăn?", ro: "Cum ajung la gară?" },
    { en: "Is it far from here?", fon: "iz it far from hir?", ro: "E departe de aici?" },
    { en: "Turn left.", fon: "tărn left", ro: "La stânga." },
    { en: "Turn right.", fon: "tărn rait", ro: "La dreapta." },
    { en: "Go straight ahead.", fon: "gou streit ahéd", ro: "Mergeți drept înainte." },
    { en: "Which bus goes to the center?", fon: "uici bas gouz tu dă séntăr?", ro: "Ce autobuz merge în centru?" },
    { en: "Where do I get off?", fon: "uer du ai get of?", ro: "Unde cobor?" },
    { en: "One ticket, please.", fon: "uan tíchet, plis", ro: "Un bilet, vă rog." },
    { en: "Is this seat free?", fon: "iz dis siit fri?", ro: "E liber locul acesta?" },
    { en: "I'm lost.", fon: "aim lost", ro: "M-am rătăcit." },
  ],
  "Urgențe 🆘": [
    { en: "Help!", fon: "help!", ro: "Ajutor!" },
    { en: "Call the police!", fon: "col dă polís!", ro: "Chemați poliția!" },
    { en: "Call an ambulance!", fon: "col en émbiulans!", ro: "Chemați o ambulanță!" },
    { en: "There is a fire!", fon: "der iz a faiăr!", ro: "E un incendiu!" },
    { en: "I lost my documents.", fon: "ai lost mai dóchiuments", ro: "Mi-am pierdut actele." },
    { en: "I don't feel well.", fon: "ai dont fiil uel", ro: "Nu mă simt bine." },
    { en: "It's an emergency!", fon: "its en imărgensi!", ro: "E o urgență!" },
    { en: "Where is the hospital?", fon: "uer iz dă hóspităl?", ro: "Unde e spitalul?" },
  ],
  "La telefon 📞": [
    { en: "Hello, this is Maria.", fon: "helou, dis iz Maria", ro: "Alo, sunt Maria." },
    { en: "Can you call me later?", fon: "chen iu col mi leităr?", ro: "Mă poți suna mai târziu?" },
    { en: "I can't hear you well.", fon: "ai chent hir iu uel", ro: "Nu vă aud bine." },
    { en: "Sorry, wrong number.", fon: "sori, rong nambăr", ro: "Scuze, ați greșit numărul." },
    { en: "Can you text me?", fon: "chen iu text mi?", ro: "Îmi poți da mesaj?" },
    { en: "I'll call you back.", fon: "ail col iu bec", ro: "Te sun eu înapoi." },
    { en: "The line is busy.", fon: "dă lain iz bizi", ro: "Sună ocupat." },
    { en: "Please leave a message.", fon: "plis liiv a mésigi", ro: "Lăsați un mesaj, vă rog." },
  ],
  "Salutări 👋": [
    { en: "How are you?", fon: "hau ar iu?", ro: "Ce mai faci?" },
    { en: "I'm fine, thank you.", fon: "aim fain, tenchiu", ro: "Sunt bine, mulțumesc." },
    { en: "Nice to meet you!", fon: "nais tu mit iu!", ro: "Îmi pare bine!" },
    { en: "Have a nice day!", fon: "hev a nais dei!", ro: "O zi frumoasă!" },
    { en: "Good evening!", fon: "gud ívning!", ro: "Bună seara!" },
    { en: "Welcome!", fon: "uélcam!", ro: "Bine ai venit!" },
    { en: "Long time no see!", fon: "long taim nou si!", ro: "Nu ne-am văzut de mult!" },
    { en: "How is your family?", fon: "hau iz ior fémili?", ro: "Ce face familia ta?" },
    { en: "Goodbye!", fon: "gudbái!", ro: "La revedere!" },
  ],
  "Small talk 💭": [
    { en: "Nice weather today!", fon: "nais uédăr tudei!", ro: "Frumoasă vreme azi!" },
    { en: "How was your weekend?", fon: "hau uoz ior uíchend?", ro: "Cum a fost weekendul?" },
    { en: "Any plans for the holidays?", fon: "eni plens for dă hólideiz?", ro: "Ai planuri de sărbători?" },
    { en: "How is work going?", fon: "hau iz uărc góing?", ro: "Cum merge treaba?" },
    { en: "Time flies!", fon: "taim flaiz!", ro: "Ce repede trece timpul!" },
    { en: "I agree with you.", fon: "ai agríi uit iu", ro: "Sunt de acord cu tine." },
    { en: "That's interesting!", fon: "dets íntresting!", ro: "Interesant!" },
    { en: "You look great!", fon: "iu luc greit!", ro: "Arăți minunat!" },
    { en: "Say hi to your family!", fon: "sei hai tu ior fémili!", ro: "Salutări familiei!" },
  ],
  "Musafiri și familie 🏡": [
    { en: "Welcome to our home!", fon: "uélcam tu auăr hom!", ro: "Bine ați venit la noi!" },
    { en: "Make yourself at home.", fon: "meic iorsélf et hom", ro: "Simte-te ca acasă." },
    { en: "Would you like some coffee?", fon: "uud iu laic sam cofi?", ro: "Dorești o cafea?" },
    { en: "Help yourself!", fon: "help iorsélf!", ro: "Servește-te!" },
    { en: "The food is ready.", fon: "dă fuud iz redi", ro: "Mâncarea e gata." },
    { en: "Thank you for coming!", fon: "tenchiu for cáming!", ro: "Mulțumim că ați venit!" },
    { en: "Come again soon!", fon: "cam aghén suun!", ro: "Mai veniți pe la noi!" },
    { en: "I made this for you.", fon: "ai meid dis for iu", ro: "Am făcut asta pentru tine." },
    { en: "Sweet dreams!", fon: "suit driims!", ro: "Vise plăcute!" },
  ],
};

// ================= DATE: CURRICULUM A1 → C2 =================
const CURRICULUM = [
  {
    nivel: "A1",
    nume: "Începător",
    emoji: "🌱",
    culoare: "#2E8F6B",
    descriere: "Primii pași: alfabetul, verbul „a fi”, prezentul și frazele de bază.",
    lectii: [
      {
        titlu: "Alfabetul și sunetele englezei",
        subtitlu: "De ce engleza nu se citește cum se scrie",
        explicatie: [
          "În română, citim aproape exact ce scriem. În engleză, aceeași literă poate suna diferit. Este normal să pară ciudat la început.",
          "TH: pune limba ușor între dinți și suflă. W: spune un «u» scurt, nu un «v». EE: prelungește sunetul «i».",
          "Nu încerca să memorezi totul dintr-o dată. Ascultă fiecare cuvânt, repetă-l de 3 ori și încearcă să copiezi sunetul.",
        ],
        exemple: [
          { en: "think", fon: "tinc (cu limba între dinți)", ro: "a gândi" },
          { en: "this", fon: "dis (TH moale)", ro: "acesta / aceasta" },
          { en: "water", fon: "uótăr (W = u scurt)", ro: "apă" },
          { en: "see", fon: "sii (i lung)", ro: "a vedea" },
        ],
        sfat: "Nu încerca să pronunți perfect de la început. Important e să fii înțeleasă — accentul românesc nu e o problemă!",
      },
      {
        titlu: "Pronumele personale",
        subtitlu: "eu, tu, el, ea... temelia oricărei propoziții",
        explicatie: [
          "În engleză, pronumele NU se poate omite ca în română. Noi spunem „merg la muncă”, dar în engleză trebuie obligatoriu „I go to work” — cu „I” (eu) la început.",
          "Lista completă: I (eu), you (tu / voi / dumneavoastră), he (el), she (ea), it (el/ea pentru obiecte și animale), we (noi), they (ei/ele).",
          "Atenție la „it”: pentru tot ce nu e persoană — masa, câinele, vremea. „It is cold” = „E frig”. Și încă ceva frumos: „you” e și „tu”, și „dumneavoastră” — engleza nu face diferența, deci nu poți greși de politețe!",
        ],
        exemple: [
          { en: "I work here.", fon: "ai uărc hir", ro: "Eu lucrez aici." },
          { en: "She is my friend.", fon: "și iz mai frend", ro: "Ea este prietena mea." },
          { en: "It is cold today.", fon: "it iz cold tudei", ro: "E frig astăzi." },
          { en: "They are nice.", fon: "dei ar nais", ro: "Ei sunt drăguți." },
        ],
        sfat: "„I” (eu) se scrie MEREU cu literă mare, oriunde ar fi în propoziție.",
      },
      {
        titlu: "Verbul „to be” (a fi)",
        subtitlu: "Cel mai folosit verb din engleză",
        explicatie: [
          "„To be” înseamnă „a fi” și are doar 3 forme la prezent: AM, IS, ARE. Cu ele poți spune cine ești, de unde ești, cum te simți.",
          "Regula: I am (eu sunt) · he/she/it is (el/ea este) · you/we/they are (tu ești, noi suntem, ei sunt).",
          "În vorbire se prescurtează aproape mereu: I am → I'm (aim), she is → she's (șiz), we are → we're (uir). E normal și politicos să folosești prescurtările.",
          "Negativ: adaugi „not” — I am not, she is not (she isn't). Întrebare: inversezi — Are you...? Is she...?",
        ],
        exemple: [
          { en: "I am from Romania.", fon: "ai em from Romeinia", ro: "Sunt din România." },
          { en: "She is tired.", fon: "și iz taiărd", ro: "Ea este obosită." },
          { en: "We are colleagues.", fon: "ui ar coligs", ro: "Suntem colegi." },
          { en: "Are you ready?", fon: "ar iu redi?", ro: "Ești gata?" },
          { en: "I'm not sure.", fon: "aim not șur", ro: "Nu sunt sigură." },
        ],
        sfat: "Învață pe de rost: I'm, you're, she's. Le vei folosi în fiecare zi.",
      },
      {
        titlu: "Articolele: a, an, the",
        subtitlu: "„un/o” și „-ul/-a” din engleză",
        explicatie: [
          "„A” și „an” = „un / o” (ceva oarecare, prima dată menționat). „The” = „-ul / -a” (ceva anume, știut). În română lipim articolul la sfârșitul cuvântului (băiat-UL), în engleză îl punem înainte (THE boy).",
          "„A” înainte de consoane: a table (o masă). „An” înainte de vocale: an apple (un măr) — doar ca să sune mai ușor.",
          "„The” se folosește la fel pentru singular și plural: the book (cartea), the books (cărțile). Simplu!",
        ],
        exemple: [
          { en: "I need a bag.", fon: "ai niid a beg", ro: "Am nevoie de o pungă." },
          { en: "She eats an apple.", fon: "și iits en epăl", ro: "Ea mănâncă un măr." },
          { en: "The manager is here.", fon: "dă menager iz hir", ro: "Managerul este aici." },
        ],
        sfat: "Dacă nu ești sigură, „the” e alegerea cea mai sigură — se folosește cel mai des.",
      },
      {
        titlu: "Pluralul substantivelor",
        subtitlu: "O regulă simplă + câteva excepții celebre",
        explicatie: [
          "Vestea bună: pluralul în engleză e mult mai simplu decât în română. Regula de aur: adaugi „-s” la sfârșit. Book → books, table → tables, day → days.",
          "Dacă se termină în -s, -sh, -ch, -x: adaugi „-es”. Bus → buses, box → boxes.",
          "Câteva cuvinte importante fac excepție și trebuie învățate pe de rost: man → men (bărbați), woman → women (femei), child → children (copii), person → people (oameni).",
        ],
        exemple: [
          { en: "two books", fon: "tu bucs", ro: "două cărți" },
          { en: "three boxes", fon: "trii boxăz", ro: "trei cutii" },
          { en: "many children", fon: "meni cildrăn", ro: "mulți copii" },
          { en: "the people at work", fon: "dă pipăl et uărc", ro: "oamenii de la muncă" },
        ],
        sfat: "„People” (oameni) e deja plural — nu spune niciodată „peoples”.",
      },
      {
        titlu: "Prezentul simplu",
        subtitlu: "Ce faci în general, zi de zi",
        explicatie: [
          "Prezentul simplu descrie obiceiuri și adevăruri: lucrez, locuiesc, îmi place. Se folosește forma de bază a verbului: I work, you work, we work, they work.",
          "SINGURA regulă de ținut minte: la he/she/it se adaugă „-s”. She works (ea lucrează), he lives (el locuiește). Atât!",
          "Negativ: don't / doesn't + verb. I don't smoke (nu fumez), she doesn't like coffee (nu-i place cafeaua). Întrebare: Do you...? / Does she...?",
        ],
        exemple: [
          { en: "I work every day.", fon: "ai uărc evri dei", ro: "Lucrez în fiecare zi." },
          { en: "She speaks English.", fon: "și spiics ingliș", ro: "Ea vorbește engleză." },
          { en: "I don't understand.", fon: "ai dont anderstend", ro: "Nu înțeleg." },
          { en: "Do you like tea?", fon: "du iu laic tii?", ro: "Îți place ceaiul?" },
        ],
        sfat: "Dacă uiți „-s”-ul la he/she, tot vei fi înțeleasă. Nu te bloca — vorbește!",
      },
      {
        titlu: "Numerele și ora",
        subtitlu: "De la 1 la 100 + cât e ceasul",
        explicatie: [
          "Numerele de bază: one, two, three, four, five, six, seven, eight, nine, ten. De la 13 la 19 se termină în „-teen” (thirteen, fourteen...). Zecile se termină în „-ty” (twenty, thirty, forty...).",
          "Atenție la perechea capcană: thirTEEN (13, accent la sfârșit) vs THIRty (30, accent la început). La fel 14/40, 15/50 etc.",
          "Ora: „It's three o'clock” (e ora 3). Cel mai simplu mod, folosit peste tot: spui ora + minutele. 3:20 = „three twenty”. 7:45 = „seven forty-five”. Funcționează mereu!",
        ],
        exemple: [
          { en: "It's ten o'clock.", fon: "its ten oclóc", ro: "E ora zece." },
          { en: "The break is at twelve thirty.", fon: "dă breic iz et tuelv tărti", ro: "Pauza e la 12:30." },
          { en: "I need twenty minutes.", fon: "ai niid tuenti mínits", ro: "Am nevoie de 20 de minute." },
        ],
        sfat: "Exersează numerele cu prețurile de la magazin — cel mai natural antrenament.",
      },
      {
        titlu: "Întrebările de bază",
        subtitlu: "What, Where, When, Who, How",
        explicatie: [
          "Cinci cuvinte care deschid orice conversație: What (ce), Where (unde), When (când), Who (cine), How (cum). Plus „How much” (cât costă) și „How many” (câți/câte).",
          "Structura tipică: cuvânt de întrebare + is/are/do/does + restul. Where is the bathroom? (Unde e baia?) What do you need? (Ce ai nevoie?)",
          "La început, poți întreba și simplificat — „Bathroom, please?” cu ton de întrebare. Nu e gramatică perfectă, dar comunici, și asta contează cel mai mult.",
        ],
        exemple: [
          { en: "What is this?", fon: "uot iz dis?", ro: "Ce este asta?" },
          { en: "Where is the exit?", fon: "uer iz di éxit?", ro: "Unde este ieșirea?" },
          { en: "When does it start?", fon: "uen daz it start?", ro: "Când începe?" },
          { en: "How much is it?", fon: "hau maci iz it?", ro: "Cât costă?" },
        ],
        sfat: "Învață aceste 5 cuvinte perfect — cu ele te descurci în 80% din situații.",
      },
    ],
    vocabular: [
      {
        titlu: "Familia",
        subtitlu: "Cuvintele pentru cei dragi",
        intro: "Primele cuvinte pe care le folosești când vorbești despre tine sunt cele despre familie. Ascultă fiecare cuvânt și repetă-l cu voce tare.",
        cuvinte: [
          { en: "mother", fon: "madăr", ro: "mamă" },
          { en: "father", fon: "fadăr", ro: "tată" },
          { en: "son", fon: "san", ro: "fiu" },
          { en: "daughter", fon: "dótăr", ro: "fiică" },
          { en: "husband", fon: "hazbănd", ro: "soț" },
          { en: "wife", fon: "uaif", ro: "soție" },
          { en: "brother", fon: "bradăr", ro: "frate" },
          { en: "sister", fon: "sistăr", ro: "soră" },
          { en: "grandmother", fon: "grendmadăr", ro: "bunică" },
          { en: "child", fon: "ciaild", ro: "copil" },
        ],
        sfat: "Fă o poză de familie în minte și numește pe fiecare în engleză — cea mai plăcută repetiție.",
      },
      {
        titlu: "Casa",
        subtitlu: "Camerele și obiectele din jur",
        intro: "Casa e sala ta de antrenament: fiecare obiect pe care îl vezi zilnic poate deveni un cuvânt englezesc știut pe viață.",
        cuvinte: [
          { en: "house", fon: "haus", ro: "casă" },
          { en: "kitchen", fon: "chicin", ro: "bucătărie" },
          { en: "bathroom", fon: "batrum", ro: "baie" },
          { en: "bedroom", fon: "bedrum", ro: "dormitor" },
          { en: "table", fon: "teibăl", ro: "masă" },
          { en: "chair", fon: "cer", ro: "scaun" },
          { en: "door", fon: "dor", ro: "ușă" },
          { en: "window", fon: "uindou", ro: "fereastră" },
          { en: "key", fon: "chi", ro: "cheie" },
          { en: "bed", fon: "bed", ro: "pat" },
        ],
        sfat: "Truc vechi și bun: lipește bilețele cu numele englezesc pe obiectele din casă o săptămână.",
      },
      {
        titlu: "Mâncarea",
        subtitlu: "De la pâine la cafea",
        intro: "Cuvintele despre mâncare le vei folosi la magazin, la muncă în pauză, și oriunde e un meniu. Sunt printre cele mai rentabile de învățat.",
        cuvinte: [
          { en: "bread", fon: "bred", ro: "pâine" },
          { en: "water", fon: "uótăr", ro: "apă" },
          { en: "milk", fon: "milc", ro: "lapte" },
          { en: "cheese", fon: "ciiz", ro: "brânză" },
          { en: "meat", fon: "miit", ro: "carne" },
          { en: "chicken", fon: "cichin", ro: "pui" },
          { en: "egg", fon: "eg", ro: "ou" },
          { en: "apple", fon: "epăl", ro: "măr" },
          { en: "coffee", fon: "cofi", ro: "cafea" },
          { en: "tea", fon: "tii", ro: "ceai" },
        ],
        sfat: "Data viitoare la cumpărături, spune în gând numele englezesc al fiecărui produs din coș.",
      },
      {
        titlu: "Culori și zile",
        subtitlu: "Ca să descrii și să planifici",
        intro: "Culorile te ajută să descrii orice, iar zilele săptămânii apar în fiecare program de lucru. Două liste mici, folosite enorm.",
        cuvinte: [
          { en: "red", fon: "red", ro: "roșu" },
          { en: "blue", fon: "blu", ro: "albastru" },
          { en: "green", fon: "griin", ro: "verde" },
          { en: "white", fon: "uait", ro: "alb" },
          { en: "black", fon: "blec", ro: "negru" },
          { en: "Monday", fon: "mandei", ro: "luni" },
          { en: "Friday", fon: "fraidei", ro: "vineri" },
          { en: "Saturday", fon: "setărdei", ro: "sâmbătă" },
          { en: "Sunday", fon: "sandei", ro: "duminică" },
          { en: "tomorrow", fon: "tumorou", ro: "mâine" },
        ],
        sfat: "Zilele săptămânii se scriu mereu cu literă mare în engleză: Monday, Friday.",
      },
    ],
  },
  {
    nivel: "A2",
    nume: "Elementar",
    emoji: "🌿",
    culoare: "#3D93B5",
    descriere: "Povestești ce faci acum, ce ai făcut ieri și ce planuri ai.",
    lectii: [
      {
        titlu: "Prezentul continuu",
        subtitlu: "Ce se întâmplă CHIAR ACUM",
        explicatie: [
          "Când ceva se întâmplă chiar în acest moment, engleza folosește: am/is/are + verb cu „-ing”. I am working = lucrez (acum, în acest moment).",
          "Diferența față de prezentul simplu: „I work here” = lucrez aici (în general, e jobul meu). „I am working now” = lucrez acum (în acest moment, nu mă deranja).",
          "Se folosește enorm la telefon și la muncă: „I'm coming!” (Vin!), „She's talking to a client” (Vorbește cu un client).",
        ],
        exemple: [
          { en: "I am working now.", fon: "ai em uărching nau", ro: "Lucrez acum." },
          { en: "He is coming.", fon: "hi iz caming", ro: "El vine (acum)." },
          { en: "What are you doing?", fon: "uot ar iu duing?", ro: "Ce faci (acum)?" },
          { en: "It's raining.", fon: "its reining", ro: "Plouă." },
        ],
        sfat: "Dacă poți adăuga „chiar acum” în română, folosește forma cu -ing.",
      },
      {
        titlu: "Trecutul simplu",
        subtitlu: "Ce s-a întâmplat ieri",
        explicatie: [
          "Pentru trecut, regula de bază: adaugi „-ed” la verb. Work → worked (am lucrat), finish → finished (am terminat). Aceeași formă pentru toate persoanele — fără excepții!",
          "Verbele cele mai folosite sunt însă neregulate și se învață pe de rost: go → went (m-am dus), have → had (am avut), see → saw (am văzut), do → did (am făcut), say → said (am spus), come → came (am venit).",
          "Negativ și întrebare cu „did”: I didn't go (nu m-am dus), Did you see it? (Ai văzut?). Observă: după „did”, verbul revine la forma de bază.",
        ],
        exemple: [
          { en: "I worked yesterday.", fon: "ai uărct iestărdei", ro: "Am lucrat ieri." },
          { en: "She went home.", fon: "și uent hom", ro: "Ea a plecat acasă." },
          { en: "I didn't finish.", fon: "ai dídănt finiș", ro: "Nu am terminat." },
          { en: "Did you see the email?", fon: "did iu si di imeil?", ro: "Ai văzut emailul?" },
        ],
        sfat: "Învață câte 2 verbe neregulate pe zi. În o lună le ai pe cele 50 esențiale.",
      },
      {
        titlu: "Viitorul: will și going to",
        subtitlu: "Planuri și promisiuni",
        explicatie: [
          "Două feluri de a vorbi despre viitor, ambele simple: „will” + verb pentru decizii și promisiuni de moment: „I will help you” (te voi ajuta). Se prescurtează: I'll (ail).",
          "„Going to” + verb pentru planuri deja făcute: „I am going to visit my son” (urmează să-mi vizitez fiul).",
          "Nu te stresa de diferență — dacă le încurci, oricine te va înțelege perfect. Cu timpul, urechea le va așeza singură.",
        ],
        exemple: [
          { en: "I will call you tomorrow.", fon: "ai uil col iu tumorou", ro: "Te sun mâine." },
          { en: "I'll do it.", fon: "ail du it", ro: "O fac eu." },
          { en: "I'm going to learn English.", fon: "aim going tu lărn ingliș", ro: "Am de gând să învăț engleza." },
          { en: "It will be fine.", fon: "it uil bi fain", ro: "Va fi bine." },
        ],
        sfat: "„I'll do it” — fraza magică la muncă. Scurtă, utilă, apreciată.",
      },
      {
        titlu: "Comparativ și superlativ",
        subtitlu: "mai bun, cel mai bun",
        explicatie: [
          "Cuvinte scurte: adaugi „-er” pentru „mai...” și „the -est” pentru „cel mai...”. Big → bigger → the biggest (mare → mai mare → cel mai mare).",
          "Cuvinte lungi: pui „more” și „the most” înainte. Beautiful → more beautiful → the most beautiful.",
          "Excepții de aur: good → better → the best (bun → mai bun → cel mai bun) și bad → worse → the worst.",
        ],
        exemple: [
          { en: "This one is cheaper.", fon: "dis uan iz cipăr", ro: "Acesta e mai ieftin." },
          { en: "It's the best option.", fon: "its dă best opșăn", ro: "E cea mai bună variantă." },
          { en: "Today is better than yesterday.", fon: "tudei iz betăr den iestărdei", ro: "Azi e mai bine decât ieri." },
        ],
        sfat: "„Better” și „the best” apar peste tot — de la reclame la conversații. Prinde-le din zbor.",
      },
      {
        titlu: "Can, must, should",
        subtitlu: "pot, trebuie, ar trebui",
        explicatie: [
          "Trei verbe mici cu putere mare, mereu urmate de verbul de bază: CAN = a putea („I can help” — pot să ajut). MUST = a trebui, obligatoriu („You must wear gloves” — trebuie să porți mănuși). SHOULD = ar trebui, un sfat („You should rest” — ar trebui să te odihnești).",
          "Nu primesc „-s” la he/she și nu au nevoie de „do” la întrebări: Can you...? Should I...?",
          "„Can I...?” e cheia politeții: Can I ask something? (Pot să întreb ceva?) Can I go now? (Pot pleca acum?)",
        ],
        exemple: [
          { en: "I can do it.", fon: "ai chen du it", ro: "Pot s-o fac." },
          { en: "You must be careful.", fon: "iu mast bi cherfăl", ro: "Trebuie să fii atentă." },
          { en: "Should I wait?", fon: "șud ai ueit?", ro: "Să aștept?" },
          { en: "Can I ask a question?", fon: "chen ai asc a cuescion?", ro: "Pot pune o întrebare?" },
        ],
        sfat: "„Can” negativ = „can't” (chent). „I can't come today” — nu pot veni azi.",
      },
      {
        titlu: "There is / There are",
        subtitlu: "„există, se află” — cum descrii ce e în jur",
        explicatie: [
          "Ca să spui că ceva EXISTĂ undeva: „There is” + singular, „There are” + plural. There is a problem (există o problemă). There are two boxes (sunt două cutii).",
          "Întrebare: Is there...? / Are there...? — Is there a bathroom here? (E vreo baie aici?)",
          "Negativ: There isn't / There aren't. There isn't any coffee (nu mai e cafea).",
        ],
        exemple: [
          { en: "There is a problem.", fon: "der iz a problém", ro: "Este o problemă." },
          { en: "There are many people.", fon: "der ar meni pipăl", ro: "Sunt mulți oameni." },
          { en: "Is there a break today?", fon: "iz der a breic tudei?", ro: "E pauză azi?" },
        ],
        sfat: "Nu traduce „este” cu „is” singur aici — începe cu „There is”. Sună natural imediat.",
      },
    ],
    vocabular: [
      {
        titlu: "Orașul",
        subtitlu: "Ca să te orientezi oriunde",
        intro: "Cuvintele orașului te ajută să întrebi de drum, să găsești farmacia sau să iei autobuzul corect — utile mai ales în călătorii.",
        cuvinte: [
          { en: "street", fon: "striit", ro: "stradă" },
          { en: "shop", fon: "șop", ro: "magazin" },
          { en: "hospital", fon: "hóspităl", ro: "spital" },
          { en: "pharmacy", fon: "fármăsi", ro: "farmacie" },
          { en: "bank", fon: "benc", ro: "bancă" },
          { en: "bus", fon: "bas", ro: "autobuz" },
          { en: "train", fon: "trein", ro: "tren" },
          { en: "ticket", fon: "tíchet", ro: "bilet" },
          { en: "market", fon: "márchet", ro: "piață" },
          { en: "station", fon: "stéișăn", ro: "gară / stație" },
        ],
        sfat: "„Where is the...?” + orice cuvânt din lista asta = te descurci în orice oraș.",
      },
      {
        titlu: "Corpul și sănătatea",
        subtitlu: "Ca să poți spune ce te doare",
        intro: "Dintre toate listele de vocabular, asta poate fi cea mai importantă: la doctor sau la farmacie, aceste cuvinte chiar contează.",
        cuvinte: [
          { en: "head", fon: "hed", ro: "cap" },
          { en: "hand", fon: "hend", ro: "mână" },
          { en: "eye", fon: "ai", ro: "ochi" },
          { en: "back", fon: "bec", ro: "spate" },
          { en: "pain", fon: "pein", ro: "durere" },
          { en: "doctor", fon: "dóctăr", ro: "doctor" },
          { en: "medicine", fon: "médisin", ro: "medicament" },
          { en: "tired", fon: "taiărd", ro: "obosit" },
          { en: "sick", fon: "sic", ro: "bolnav" },
          { en: "healthy", fon: "helti", ro: "sănătos" },
        ],
        sfat: "Fraza de reținut: „My back hurts” (mă doare spatele) — „hurts” merge cu orice parte a corpului.",
      },
      {
        titlu: "Vremea",
        subtitlu: "Subiectul preferat de conversație",
        intro: "Vremea e subiectul universal de conversație măruntă — perfectă pentru a sparge gheața cu colegii.",
        cuvinte: [
          { en: "sun", fon: "san", ro: "soare" },
          { en: "rain", fon: "rein", ro: "ploaie" },
          { en: "snow", fon: "snou", ro: "zăpadă" },
          { en: "wind", fon: "uind", ro: "vânt" },
          { en: "cloud", fon: "claud", ro: "nor" },
          { en: "hot", fon: "hot", ro: "foarte cald" },
          { en: "cold", fon: "cold", ro: "frig" },
          { en: "warm", fon: "uorm", ro: "călduț, plăcut" },
          { en: "weather", fon: "uédăr", ro: "vreme" },
          { en: "umbrella", fon: "ambréla", ro: "umbrelă" },
        ],
        sfat: "„Nice weather today!” — cea mai simplă propoziție de început de conversație din lume.",
      },
    ],
  },
  {
    nivel: "B1",
    nume: "Intermediar",
    emoji: "🌳",
    culoare: "#7C63AD",
    descriere: "Conversații adevărate: experiențe, condiții, verbe frazale.",
    lectii: [
      {
        titlu: "Present Perfect",
        subtitlu: "have/has + participiu — trecutul legat de prezent",
        explicatie: [
          "Present Perfect = have/has + forma a 3-a a verbului. Se folosește pentru experiențe de viață și lucruri recente care contează ACUM: „I have finished” (am terminat — chiar acum, e gata).",
          "Diferența față de trecutul simplu: „I worked there in 2010” (moment precis, trecut încheiat) vs „I have worked there for 5 years” (și încă lucrez / contează acum).",
          "Cuvintele-semnal: ever (vreodată), never (niciodată), just (tocmai), already (deja), yet (încă). „Have you ever been to London?” — Ai fost vreodată la Londra?",
        ],
        exemple: [
          { en: "I have finished the report.", fon: "ai hev fíniștd dă riport", ro: "Am terminat raportul." },
          { en: "She has just arrived.", fon: "și hez geast ăraivd", ro: "Ea tocmai a sosit." },
          { en: "Have you ever tried it?", fon: "hev iu evăr traid it?", ro: "Ai încercat vreodată?" },
          { en: "I haven't seen him yet.", fon: "ai hevănt siin him iet", ro: "Nu l-am văzut încă." },
        ],
        sfat: "„I've just...” (tocmai am...) — construcție folosită zilnic. I've just sent the email.",
      },
      {
        titlu: "Condiționalul: dacă... atunci...",
        subtitlu: "Tipul 0 și tipul 1",
        explicatie: [
          "Tipul 0 — adevăruri generale: If + prezent, prezent. „If you heat water, it boils” (dacă încălzești apa, fierbe).",
          "Tipul 1 — situații reale, viitoare: If + prezent, will + verb. „If it rains, I will stay home” (dacă plouă, stau acasă). Atenție: după „if” NU se pune „will”, chiar dacă e viitor!",
          "Foarte util la muncă: „If you need help, I will come” — dacă ai nevoie de ajutor, vin.",
        ],
        exemple: [
          { en: "If it rains, I will stay home.", fon: "if it reins, ai uil stei hom", ro: "Dacă plouă, stau acasă." },
          { en: "If you need me, call me.", fon: "if iu niid mi, col mi", ro: "Dacă ai nevoie de mine, sună-mă." },
          { en: "If I finish early, I'll help you.", fon: "if ai finiș ărli, ail help iu", ro: "Dacă termin devreme, te ajut." },
        ],
        sfat: "Regula scurtă: „will” nu stă niciodată imediat după „if”.",
      },
      {
        titlu: "Diateza pasivă",
        subtitlu: "„se face”, „a fost făcut”",
        explicatie: [
          "Pasivul spune ce se întâmplă cu ceva, fără să zici cine face: be + forma a 3-a. „The office is cleaned every day” (biroul e curățat zilnic). „It was made in Romania” (a fost făcut în România).",
          "Îl auzi constant în instrucțiuni și anunțuri: „Masks must be worn” (măștile trebuie purtate), „The meeting was cancelled” (ședința a fost anulată).",
          "Nu trebuie să-l construiești perfect la început — dar trebuie să-l RECUNOȘTI când îl auzi, ca să înțelegi anunțurile de la muncă.",
        ],
        exemple: [
          { en: "The meeting was cancelled.", fon: "dă miting uoz chensăld", ro: "Ședința a fost anulată." },
          { en: "It is made of wood.", fon: "it iz meid ov uud", ro: "E făcut din lemn." },
          { en: "The salary is paid monthly.", fon: "dă selări iz peid mantli", ro: "Salariul se plătește lunar." },
        ],
        sfat: "Vezi „was/were + verb-ed”? E pasiv trecut: „a fost + făcut/spus/trimis”.",
      },
      {
        titlu: "Verbe frazale esențiale",
        subtitlu: "get up, look for, turn on...",
        explicatie: [
          "Verbele frazale = verb + particulă mică (up, on, off, for) care schimbă complet sensul. Sunt sufletul englezei vorbite — nativul spune rar „search”, spune „look for”.",
          "Cele 8 de aur: get up (a se trezi), turn on/off (a porni/opri), look for (a căuta), pick up (a ridica / a lua pe cineva), give up (a renunța), find out (a afla), put on (a-și pune, îmbrăca), come back (a se întoarce).",
          "Nu le traduce cuvânt cu cuvânt — „give up” nu are legătură cu „a da sus”. Învață-le ca pe cuvinte noi, întregi.",
        ],
        exemple: [
          { en: "I get up at six.", fon: "ai get ap et six", ro: "Mă trezesc la șase." },
          { en: "Turn off the light, please.", fon: "tărn of dă lait, plis", ro: "Stinge lumina, te rog." },
          { en: "I'm looking for my keys.", fon: "aim lúching for mai chiis", ro: "Îmi caut cheile." },
          { en: "Don't give up!", fon: "dont ghiv ap!", ro: "Nu renunța!" },
        ],
        sfat: "Câte un verb frazal pe săptămână, folosit în 3 propoziții proprii — se lipește definitiv.",
      },
      {
        titlu: "Gerunziu sau infinitiv?",
        subtitlu: "like doing vs want to do",
        explicatie: [
          "Unele verbe cer după ele „-ing”, altele cer „to + verb”. Nu există o logică perfectă — se învață pe grupuri.",
          "Cu -ING: like, love, enjoy, hate, finish, stop. „I enjoy cooking” (îmi place să gătesc), „I finished working” (am terminat de lucrat).",
          "Cu TO: want, need, decide, hope, plan, try. „I want to learn” (vreau să învăț), „I need to go” (trebuie să plec).",
        ],
        exemple: [
          { en: "I enjoy cooking.", fon: "ai engiói cúching", ro: "Îmi place să gătesc." },
          { en: "I want to learn English.", fon: "ai uont tu lărn ingliș", ro: "Vreau să învăț engleza." },
          { en: "She decided to stay.", fon: "și disáidid tu stei", ro: "Ea a decis să rămână." },
          { en: "Stop worrying!", fon: "stop uăriing!", ro: "Nu-ți mai face griji!" },
        ],
        sfat: "Ține minte perechea: LIKE + -ing, WANT + to. Restul vin de la sine.",
      },
    ],
    vocabular: [
      {
        titlu: "La birou și la muncă",
        subtitlu: "Limbajul jobului, dincolo de fraze",
        intro: "Acestea sunt cuvintele care apar în emailuri, programe de lucru și discuții cu șeful — vocabularul de bază al vieții profesionale.",
        cuvinte: [
          { en: "meeting", fon: "míting", ro: "ședință" },
          { en: "schedule", fon: "schégiul", ro: "program, orar" },
          { en: "deadline", fon: "dédlain", ro: "termen limită" },
          { en: "task", fon: "tasc", ro: "sarcină" },
          { en: "boss", fon: "bos", ro: "șef" },
          { en: "colleague", fon: "cólig", ro: "coleg" },
          { en: "salary", fon: "sélări", ro: "salariu" },
          { en: "shift", fon: "șift", ro: "tură, schimb" },
          { en: "contract", fon: "cóntract", ro: "contract" },
          { en: "break", fon: "breic", ro: "pauză" },
        ],
        sfat: "„Deadline” și „meeting” se folosesc și în română — le știi deja pe jumătate!",
      },
      {
        titlu: "Emoții și stări",
        subtitlu: "Ca să spui cum te simți cu adevărat",
        intro: "La B1 nu mai spui doar „good” sau „bad” — poți exprima nuanțe. Aceste cuvinte fac conversațiile tale mai umane și mai calde.",
        cuvinte: [
          { en: "happy", fon: "hepi", ro: "fericit" },
          { en: "sad", fon: "sed", ro: "trist" },
          { en: "angry", fon: "engri", ro: "furios" },
          { en: "worried", fon: "uărid", ro: "îngrijorat" },
          { en: "excited", fon: "exsáitid", ro: "entuziasmat" },
          { en: "proud", fon: "praud", ro: "mândru" },
          { en: "nervous", fon: "nărvăs", ro: "emoționat" },
          { en: "calm", fon: "calm", ro: "calm" },
          { en: "surprised", fon: "sărpráizd", ro: "surprins" },
          { en: "grateful", fon: "gréitfăl", ro: "recunoscător" },
        ],
        sfat: "„I'm so proud of you” — spune-i asta nepotului în engleză și vezi ce zâmbet primești.",
      },
    ],
  },
  {
    nivel: "B2",
    nume: "Intermediar avansat",
    emoji: "🌲",
    culoare: "#BE7A34",
    descriere: "Nuanțe: ipoteze, vorbire indirectă, propoziții complexe.",
    lectii: [
      {
        titlu: "Condiționalele 2 și 3",
        subtitlu: "„dacă aș...” și „dacă aș fi...”",
        explicatie: [
          "Tipul 2 — situații imaginare, prezente: If + trecut, would + verb. „If I had time, I would travel” (dacă aș avea timp, aș călători). Nu e despre trecut — e despre un „ce-ar fi dacă” acum.",
          "Tipul 3 — regrete despre trecut: If + had + participiu, would have + participiu. „If I had known, I would have called” (dacă aș fi știut, aș fi sunat).",
          "Fraza de politețe supremă vine de aici: „Would you...?” (Ați putea...?) și „I would like...” (Aș dori...) — mult mai elegant decât „I want”.",
        ],
        exemple: [
          { en: "If I had time, I would travel.", fon: "if ai hed taim, ai uud trevăl", ro: "Dacă aș avea timp, aș călători." },
          { en: "I would like a coffee.", fon: "ai uud laic a cofi", ro: "Aș dori o cafea." },
          { en: "If I had known, I would have called.", fon: "if ai hed noun, ai uud hev cold", ro: "Dacă aș fi știut, aș fi sunat." },
        ],
        sfat: "Înlocuiește „I want” cu „I would like” (aid laic) — instant mai politicos.",
      },
      {
        titlu: "Vorbirea indirectă",
        subtitlu: "„El a spus că...”",
        explicatie: [
          "Când relatezi ce a spus cineva, timpul verbului „dă un pas înapoi”: prezentul devine trecut. El a zis „I am tired” → He said he WAS tired (a zis că E obosit... dar în engleză trecut).",
          "„Say” și „tell”: say ceva, tell cuiva ceva. „She said that...” dar „She told ME that...”.",
          "La întrebări indirecte, ordinea revine la normal: „Where is he?” → „She asked where he was” (fără inversare).",
        ],
        exemple: [
          { en: "He said he was tired.", fon: "hi sed hi uoz taiărd", ro: "A spus că e obosit." },
          { en: "She told me she would come.", fon: "și told mi și uud cam", ro: "Mi-a zis că va veni." },
          { en: "They asked where I worked.", fon: "dei asct uer ai uărct", ro: "Au întrebat unde lucrez." },
        ],
        sfat: "Regula pe scurt: când relatezi, dă verbul cu un timp înapoi.",
      },
      {
        titlu: "Modale perfecte",
        subtitlu: "must have, should have, could have",
        explicatie: [
          "Cu ele judeci trecutul: MUST HAVE + participiu = „sigur a...” (deducție): „He must have forgotten” (sigur a uitat). SHOULD HAVE = „ar fi trebuit să...” (reproș/regret): „I should have asked” (ar fi trebuit să întreb). COULD HAVE = „ar fi putut să...” (posibilitate ratată).",
          "În vorbire se aud contopite: should have → „shoulda” (șuda), must have → „musta”. Nu te speria când le auzi rapid.",
        ],
        exemple: [
          { en: "He must have forgotten.", fon: "hi mast hev forgótăn", ro: "Sigur a uitat." },
          { en: "I should have asked.", fon: "ai șud hev asct", ro: "Ar fi trebuit să întreb." },
          { en: "We could have left earlier.", fon: "ui cud hev left ărliăr", ro: "Am fi putut pleca mai devreme." },
        ],
        sfat: "„Should have” e regretul, „must have” e deducția. Două nuanțe, o structură.",
      },
      {
        titlu: "Propoziții relative",
        subtitlu: "who, which, that, where",
        explicatie: [
          "Leagă două idei elegant: WHO pentru persoane („the woman who works here” — femeia care lucrează aici), WHICH/THAT pentru lucruri („the report that I sent” — raportul pe care l-am trimis), WHERE pentru locuri.",
          "Deseori, „that” se poate omite complet: „the report I sent” — perfect corect și foarte natural.",
        ],
        exemple: [
          { en: "The woman who works here is kind.", fon: "dă uumăn hu uărcs hir iz caind", ro: "Femeia care lucrează aici e amabilă." },
          { en: "The email that I sent was important.", fon: "di imeil det ai sent uoz impórtant", ro: "Emailul pe care l-am trimis era important." },
          { en: "This is the place where I work.", fon: "dis iz dă pleis uer ai uărc", ro: "Acesta e locul unde lucrez." },
        ],
        sfat: "„Care” din română = who (persoane) sau that (lucruri). Simplu de ținut minte.",
      },
    ],
    vocabular: [
      {
        titlu: "Cuvinte pentru discuții",
        subtitlu: "Ca să-ți susții punctul de vedere",
        intro: "La B2 începi să participi la discuții adevărate: să-ți spui părerea, să compari variante, să propui soluții. Acestea sunt uneltele.",
        cuvinte: [
          { en: "opinion", fon: "opíniăn", ro: "părere" },
          { en: "advantage", fon: "advántigi", ro: "avantaj" },
          { en: "disadvantage", fon: "disadvántigi", ro: "dezavantaj" },
          { en: "solution", fon: "solúșăn", ro: "soluție" },
          { en: "decision", fon: "disíjăn", ro: "decizie" },
          { en: "agree", fon: "agríi", ro: "a fi de acord" },
          { en: "disagree", fon: "disagríi", ro: "a nu fi de acord" },
          { en: "suggest", fon: "săgést", ro: "a sugera" },
          { en: "convince", fon: "convíns", ro: "a convinge" },
          { en: "argument", fon: "árghiument", ro: "argument" },
        ],
        sfat: "„In my opinion...” — începutul elegant al oricărei păreri. Folosește-l cu încredere.",
      },
    ],
  },
  {
    nivel: "C1",
    nume: "Avansat",
    emoji: "🏔️",
    culoare: "#4A6E86",
    descriere: "Fluență și eleganță: nuanțe fine, conectori, colocații.",
    lectii: [
      {
        titlu: "Colocații: make vs do & prietenii",
        subtitlu: "Combinațiile care sună „nativ”",
        explicatie: [
          "Colocațiile sunt perechi de cuvinte care „merg împreună” natural. MAKE: make a decision, make a mistake, make money, make friends. DO: do homework, do business, do your best, do the shopping.",
          "Alte perechi de aur: heavy rain (nu „strong rain”), fast food dar quick shower, take a photo, pay attention, have a break.",
          "La acest nivel, corectitudinea gramaticală nu mai e problema — naturalețea e. Colocațiile sunt scurtătura spre a suna fluent.",
        ],
        exemple: [
          { en: "I made a mistake.", fon: "ai meid a misteic", ro: "Am făcut o greșeală." },
          { en: "Let's do our best.", fon: "lets du auăr best", ro: "Să dăm tot ce putem." },
          { en: "Pay attention, please.", fon: "pei atenșăn, plis", ro: "Fiți atenți, vă rog." },
        ],
        sfat: "Când înveți un cuvânt nou, învață-l cu „partenerul” lui, nu singur.",
      },
      {
        titlu: "Conectori avansați",
        subtitlu: "however, therefore, although, whereas",
        explicatie: [
          "Conectorii transformă propozițiile simple în discurs matur: HOWEVER (totuși), THEREFORE (prin urmare), ALTHOUGH (deși), WHEREAS (în timp ce, pe când), MOREOVER (mai mult decât atât), NEVERTHELESS (cu toate acestea).",
          "„Although” introduce contrastul în aceeași frază: „Although it was hard, I finished”. „However” începe o frază nouă: „It was hard. However, I finished.”",
        ],
        exemple: [
          { en: "Although it was difficult, I finished it.", fon: "oldóu it uoz díficălt, ai fíniștd it", ro: "Deși a fost greu, am terminat." },
          { en: "Therefore, we need a new plan.", fon: "dérfor, ui niid a niu plen", ro: "Prin urmare, avem nevoie de un plan nou." },
          { en: "However, I disagree.", fon: "hauévăr, ai disagríi", ro: "Totuși, nu sunt de acord." },
        ],
        sfat: "Un „however” bine plasat valorează cât zece „but”-uri.",
      },
      {
        titlu: "Inversiuni pentru emfază",
        subtitlu: "„Never have I seen...”",
        explicatie: [
          "Pentru dramatism și eleganță, engleza avansată inversează ordinea după cuvinte negative: „Never have I seen such a thing” (niciodată n-am văzut așa ceva) în loc de „I have never seen...”.",
          "Formule de recunoscut: Not only... but also („Not only is she smart, but also kind”), Rarely, Seldom, Under no circumstances (sub nicio formă).",
          "Le vei întâlni în cărți, discursuri și emailuri formale. Nu sunt necesare zilnic, dar a le înțelege te ridică la nivel de cititor matur.",
        ],
        exemple: [
          { en: "Never have I seen such a thing.", fon: "nevăr hev ai siin saci a ting", ro: "Niciodată n-am văzut așa ceva." },
          { en: "Not only is she smart, but also kind.", fon: "not onli iz și smart, bat olso caind", ro: "Nu doar că e deșteaptă, dar e și bună." },
        ],
        sfat: "Folosește-le rar, ca sarea în bucate — atunci au efect maxim.",
      },
    ],
    vocabular: [
      {
        titlu: "Verbe elegante",
        subtitlu: "Verbele care ridică nivelul oricărei fraze",
        intro: "Diferența dintre B2 și C1 se aude în verbe: în loc de „get” și „make” la orice, folosești verbul precis. Acestea apar constant în emailuri profesionale.",
        cuvinte: [
          { en: "achieve", fon: "acíiv", ro: "a realiza, a atinge" },
          { en: "maintain", fon: "meintéin", ro: "a menține" },
          { en: "require", fon: "ricuáiăr", ro: "a necesita" },
          { en: "provide", fon: "prováid", ro: "a furniza, a oferi" },
          { en: "consider", fon: "consídăr", ro: "a lua în considerare" },
          { en: "ensure", fon: "enșúr", ro: "a (se) asigura" },
          { en: "obtain", fon: "obtéin", ro: "a obține" },
          { en: "avoid", fon: "avóid", ro: "a evita" },
          { en: "improve", fon: "imprúv", ro: "a îmbunătăți" },
          { en: "encourage", fon: "encărigi", ro: "a încuraja" },
        ],
        sfat: "În emailuri formale, „provide” și „ensure” sunt aur: „Please ensure...”, „We can provide...”.",
      },
    ],
  },
  {
    nivel: "C2",
    nume: "Măiestrie",
    emoji: "👑",
    culoare: "#8E5A80",
    descriere: "Idiomuri, umor, registru — engleza ca a doua natură.",
    lectii: [
      {
        titlu: "Idiomuri esențiale",
        subtitlu: "Expresiile care nu se traduc cuvânt cu cuvânt",
        explicatie: [
          "Idiomurile sunt „vorbele din bătrâni” ale englezei: piece of cake (floare la ureche), break the ice (a sparge gheața — asta chiar e la fel!), it's raining cats and dogs (plouă cu găleata), once in a blue moon (din an în Paște).",
          "Altele utile: cost an arm and a leg (costă o avere), hit the sack (a merge la culcare), under the weather (a nu se simți bine), the ball is in your court (mingea e la tine).",
          "Nu le folosi forțat — dar când le recunoști în conversație și zâmbești la momentul potrivit, ai ajuns „acasă” în limbă.",
        ],
        exemple: [
          { en: "It was a piece of cake!", fon: "it uoz a piis ov cheic!", ro: "A fost floare la ureche!" },
          { en: "I'm feeling under the weather.", fon: "aim fíling andăr dă uédăr", ro: "Nu mă simt prea bine." },
          { en: "It costs an arm and a leg.", fon: "it costs en arm end a leg", ro: "Costă o avere." },
        ],
        sfat: "Un idiom pe săptămână, folosit într-o conversație reală — colecția crește frumos.",
      },
      {
        titlu: "Registru: formal vs informal",
        subtitlu: "Aceeași idee, trei haine diferite",
        explicatie: [
          "La nivel de măiestrie, alegi tonul potrivit situației. Informal: „Can you give me a hand?” Neutru: „Could you help me?” Formal: „I would appreciate your assistance.”",
          "Perechi utile: get → receive/obtain, need → require, ask → inquire, buy → purchase, start → commence. În emailuri oficiale folosești coloana a doua; cu colegii, prima.",
          "Regula socială: e mai sigur să fii puțin prea formal decât prea familiar — poți relaxa tonul pe parcurs.",
        ],
        exemple: [
          { en: "I would appreciate your assistance.", fon: "ai uud aprișieit ior asistăns", ro: "V-aș fi recunoscătoare pentru ajutor." },
          { en: "Please do not hesitate to contact me.", fon: "plis du not héziteit tu cóntact mi", ro: "Nu ezitați să mă contactați." },
          { en: "Give me a hand, will you?", fon: "ghiv mi a hend, uil iu?", ro: "Dă-mi o mână de ajutor, vrei?" },
        ],
        sfat: "Salvează-ți 5 formule de email formal — le vei refolosi ani de zile.",
      },
      {
        titlu: "Nuanțe fine de sens",
        subtitlu: "Cuvinte „gemene” care nu sunt identice",
        explicatie: [
          "Ultima treaptă: perechile aproape sinonime. FAMOUS (celebru, pozitiv) vs NOTORIOUS (celebru pentru ceva rău). CHILDISH (copilăros, negativ) vs CHILDLIKE (cu candoare de copil, pozitiv). HISTORIC (important istoric) vs HISTORICAL (legat de istorie).",
          "ECONOMIC (al economiei) vs ECONOMICAL (econom, care nu risipește). ALONE (singur, neutru) vs LONELY (singuratic, trist).",
          "Aceste nuanțe nu se învață din reguli, ci din citit și ascultat mult. La acest nivel, cea mai bună lecție e o carte bună în engleză.",
        ],
        exemple: [
          { en: "She is famous, not notorious!", fon: "și iz feimăs, not notóriăs!", ro: "E celebră, nu rău-famată!" },
          { en: "This car is very economical.", fon: "dis car iz veri economícăl", ro: "Mașina asta e foarte economă." },
          { en: "I live alone, but I'm not lonely.", fon: "ai liv aloun, bat aim not lonli", ro: "Locuiesc singură, dar nu mă simt singură." },
        ],
        sfat: "La C2, profesorul tău devine lectura. Începe cu romane simple, apoi urcă.",
      },
    ],
    vocabular: [
      {
        titlu: "Cuvinte rafinate",
        subtitlu: "Vocabularul care impresionează",
        intro: "Ultimul strat: cuvintele pe care le folosesc vorbitorii educați ca să exprime exact ce vor. Le vei recunoaște în cărți, articole și discursuri.",
        cuvinte: [
          { en: "subtle", fon: "sátăl (b-ul e mut!)", ro: "subtil" },
          { en: "thorough", fon: "tără", ro: "minuțios, temeinic" },
          { en: "genuine", fon: "géniuin", ro: "autentic, sincer" },
          { en: "remarkable", fon: "rimárcabăl", ro: "remarcabil" },
          { en: "inevitable", fon: "inévitabăl", ro: "inevitabil" },
          { en: "deliberate", fon: "delíberăt", ro: "intenționat" },
          { en: "profound", fon: "profáund", ro: "profund" },
          { en: "versatile", fon: "vărsatail", ro: "versatil" },
          { en: "meticulous", fon: "metíchiulăs", ro: "meticulos" },
          { en: "compelling", fon: "compéling", ro: "convingător, captivant" },
        ],
        sfat: "Multe seamănă cu româna (inevitable, profound) — moștenirea latină te ajută la final de drum.",
      },
    ],
  },
];

// ================= EXERCIȚII (alege răspunsul corect) =================
function amesteca(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TOATE_EXEMPLELE = CURRICULUM.flatMap((n) =>
  n.lectii.flatMap((l) => l.exemple).concat((n.vocabular || []).flatMap((m) => m.cuvinte))
);

function construiesteQuiz(lectie) {
  const exemple = amesteca(lectie.exemple).slice(0, 4);
  return exemple.map((ex, i) => {
    const tip = i % 2 === 0 ? "en-ro" : "ro-en"; // alternăm direcția
    const cheie = tip === "en-ro" ? "ro" : "en";
    // Preferăm variante greșite din aceeași lecție (mai provocator), completăm din restul materiei
    const localePool = lectie.exemple.filter((e) => e !== ex && e[cheie] !== ex[cheie]);
    const globalPool = TOATE_EXEMPLELE.filter((e) => e[cheie] !== ex[cheie] && e.ro !== ex.ro);
    const distractori = [...new Set([...amesteca(localePool), ...amesteca(globalPool)].map((e) => e[cheie]))].slice(0, 3);
    return {
      intrebare: tip === "en-ro" ? ex.en : ex.ro,
      tip,
      corect: ex[cheie],
      optiuni: amesteca([ex[cheie], ...distractori]),
      audio: ex.en,
    };
  });
}

// ================= REPETIȚIE INTELIGENTĂ =================
// Adună tot ce a învățat: fraze din lecția zilei + exemple/cuvinte din lecțiile bifate
function itemeInvatate(lectiiCitite, invatate) {
  const iteme = [...invatate];
  CURRICULUM.forEach((n) => {
    n.lectii.forEach((l, i) => { if (lectiiCitite[`${n.nivel}-${i}`]) iteme.push(...l.exemple); });
    (n.vocabular || []).forEach((m, i) => { if (lectiiCitite[`${n.nivel}-v${i}`]) iteme.push(...m.cuvinte); });
  });
  const vazute = new Set();
  return iteme.filter((it) => (vazute.has(it.en) ? false : (vazute.add(it.en), true)));
}

// Sesiune de max 10 iteme: greșelile și itemele noi au prioritate; direcția alternează aleator
function construiesteSesiune(iteme, puterea) {
  const prioritate = (it) => {
    const s = puterea[it.en];
    if (!s) return 3 + Math.random(); // nou = prioritate mare
    return s.gresite * 3 - s.corecte + Math.random();
  };
  return [...iteme]
    .sort((a, b) => prioritate(b) - prioritate(a))
    .slice(0, 10)
    .map((it) => ({ ...it, tip: Math.random() < 0.5 ? "ro-en" : "en-ro" }));
}

// ================= DATE: GHID RAPID (referință) =================
const VERBE_NEREGULATE = {
  aur: [
    { v1: "be", v2: "was/were", v3: "been", fon: "bi · uoz, uăr · biin", ro: "a fi" },
    { v1: "have", v2: "had", v3: "had", fon: "hev · hed · hed", ro: "a avea" },
    { v1: "do", v2: "did", v3: "done", fon: "du · did · dan", ro: "a face" },
    { v1: "go", v2: "went", v3: "gone", fon: "gou · uent · gon", ro: "a merge" },
    { v1: "say", v2: "said", v3: "said", fon: "sei · sed · sed", ro: "a spune" },
    { v1: "get", v2: "got", v3: "got", fon: "get · got · got", ro: "a primi, a obține" },
    { v1: "make", v2: "made", v3: "made", fon: "meic · meid · meid", ro: "a face, a crea" },
    { v1: "know", v2: "knew", v3: "known", fon: "nou · niu · noun", ro: "a ști" },
    { v1: "take", v2: "took", v3: "taken", fon: "teic · tuc · téichen", ro: "a lua" },
    { v1: "see", v2: "saw", v3: "seen", fon: "si · so · siin", ro: "a vedea" },
    { v1: "come", v2: "came", v3: "come", fon: "cam · cheim · cam", ro: "a veni" },
    { v1: "give", v2: "gave", v3: "given", fon: "ghiv · gheiv · ghívăn", ro: "a da" },
    { v1: "find", v2: "found", v3: "found", fon: "faind · faund · faund", ro: "a găsi" },
    { v1: "tell", v2: "told", v3: "told", fon: "tel · told · told", ro: "a spune cuiva" },
    { v1: "think", v2: "thought", v3: "thought", fon: "tinc · tot · tot", ro: "a gândi" },
    { v1: "put", v2: "put", v3: "put", fon: "put · put · put", ro: "a pune" },
    { v1: "feel", v2: "felt", v3: "felt", fon: "fiil · felt · felt", ro: "a simți" },
    { v1: "leave", v2: "left", v3: "left", fon: "liiv · left · left", ro: "a pleca, a lăsa" },
    { v1: "bring", v2: "brought", v3: "brought", fon: "bring · brot · brot", ro: "a aduce" },
    { v1: "buy", v2: "bought", v3: "bought", fon: "bai · bot · bot", ro: "a cumpăra" },
  ],
  restul: [
    { v1: "begin", v2: "began", v3: "begun", fon: "bighín · bighén · bighán", ro: "a începe" },
    { v1: "break", v2: "broke", v3: "broken", fon: "breic · brouc · bróuchen", ro: "a sparge, a rupe" },
    { v1: "choose", v2: "chose", v3: "chosen", fon: "ciuz · ciouz · cióuzăn", ro: "a alege" },
    { v1: "cost", v2: "cost", v3: "cost", fon: "cost · cost · cost", ro: "a costa" },
    { v1: "cut", v2: "cut", v3: "cut", fon: "cat · cat · cat", ro: "a tăia" },
    { v1: "drink", v2: "drank", v3: "drunk", fon: "drinc · drenc · dranc", ro: "a bea" },
    { v1: "drive", v2: "drove", v3: "driven", fon: "draiv · drouv · drívăn", ro: "a conduce" },
    { v1: "eat", v2: "ate", v3: "eaten", fon: "iit · eit · íităn", ro: "a mânca" },
    { v1: "fall", v2: "fell", v3: "fallen", fon: "fol · fel · fólăn", ro: "a cădea" },
    { v1: "fly", v2: "flew", v3: "flown", fon: "flai · flu · floun", ro: "a zbura" },
    { v1: "forget", v2: "forgot", v3: "forgotten", fon: "forghét · forgót · forgótăn", ro: "a uita" },
    { v1: "grow", v2: "grew", v3: "grown", fon: "grou · gru · groun", ro: "a crește" },
    { v1: "hear", v2: "heard", v3: "heard", fon: "hir · hărd · hărd", ro: "a auzi" },
    { v1: "hold", v2: "held", v3: "held", fon: "hold · held · held", ro: "a ține" },
    { v1: "keep", v2: "kept", v3: "kept", fon: "chiip · chept · chept", ro: "a păstra" },
    { v1: "lose", v2: "lost", v3: "lost", fon: "luz · lost · lost", ro: "a pierde" },
    { v1: "meet", v2: "met", v3: "met", fon: "miit · met · met", ro: "a întâlni" },
    { v1: "pay", v2: "paid", v3: "paid", fon: "pei · peid · peid", ro: "a plăti" },
    { v1: "read", v2: "read", v3: "read", fon: "riid · red · red", ro: "a citi" },
    { v1: "run", v2: "ran", v3: "run", fon: "ran · ren · ran", ro: "a alerga" },
    { v1: "sell", v2: "sold", v3: "sold", fon: "sel · sold · sold", ro: "a vinde" },
    { v1: "send", v2: "sent", v3: "sent", fon: "send · sent · sent", ro: "a trimite" },
    { v1: "sit", v2: "sat", v3: "sat", fon: "sit · set · set", ro: "a sta jos" },
    { v1: "sleep", v2: "slept", v3: "slept", fon: "sliip · slept · slept", ro: "a dormi" },
    { v1: "speak", v2: "spoke", v3: "spoken", fon: "spiic · spouc · spóuchen", ro: "a vorbi" },
    { v1: "spend", v2: "spent", v3: "spent", fon: "spend · spent · spent", ro: "a cheltui, a petrece" },
    { v1: "stand", v2: "stood", v3: "stood", fon: "stend · stud · stud", ro: "a sta în picioare" },
    { v1: "swim", v2: "swam", v3: "swum", fon: "suim · suem · suam", ro: "a înota" },
    { v1: "teach", v2: "taught", v3: "taught", fon: "tici · tot · tot", ro: "a preda" },
    { v1: "understand", v2: "understood", v3: "understood", fon: "anderstend · anderstud · anderstud", ro: "a înțelege" },
    { v1: "wake", v2: "woke", v3: "woken", fon: "ueic · uouc · uóuchen", ro: "a se trezi" },
    { v1: "wear", v2: "wore", v3: "worn", fon: "uer · uor · uorn", ro: "a purta" },
    { v1: "win", v2: "won", v3: "won", fon: "uin · uan · uan", ro: "a câștiga" },
    { v1: "write", v2: "wrote", v3: "written", fon: "rait · rout · rítăn", ro: "a scrie" },
  ],
};

const TIMPURI = [
  { nume: "Prezentul simplu", formula: "verb (+s la he/she/it)", cand: "Obiceiuri, lucruri general valabile, programe.", ex: { en: "She works here.", fon: "și uărcs hir", ro: "Ea lucrează aici." } },
  { nume: "Prezentul continuu", formula: "am / is / are + verb-ing", cand: "Ce se întâmplă chiar acum, în acest moment.", ex: { en: "I am working now.", fon: "ai em uărching nau", ro: "Lucrez acum." } },
  { nume: "Trecutul simplu", formula: "verb-ed / forma a 2-a", cand: "Acțiuni terminate, la un moment precis din trecut.", ex: { en: "I worked yesterday.", fon: "ai uărct iestărdei", ro: "Am lucrat ieri." } },
  { nume: "Trecutul continuu", formula: "was / were + verb-ing", cand: "Ce era în desfășurare la un moment din trecut.", ex: { en: "I was sleeping at ten.", fon: "ai uoz slíiping et ten", ro: "Dormeam la zece." } },
  { nume: "Present Perfect", formula: "have / has + forma a 3-a", cand: "Experiențe de viață; ceva recent care contează acum.", ex: { en: "I have finished.", fon: "ai hev fíniștd", ro: "Am terminat (chiar acum)." } },
  { nume: "Past Perfect", formula: "had + forma a 3-a", cand: "Un trecut petrecut ÎNAINTEA altui trecut.", ex: { en: "I had left before he came.", fon: "ai hed left bifór hi cheim", ro: "Plecasem înainte să vină el." } },
  { nume: "Viitor cu will", formula: "will + verb", cand: "Decizii de moment, promisiuni, predicții.", ex: { en: "I will call you.", fon: "ai uil col iu", ro: "Te voi suna." } },
  { nume: "Viitor cu going to", formula: "am / is / are going to + verb", cand: "Planuri deja făcute, intenții.", ex: { en: "I'm going to visit them.", fon: "aim going tu vízit dem", ro: "Am de gând să-i vizitez." } },
  { nume: "Condiționalul", formula: "would + verb", cand: "„Aș...” — dorințe, politețe, situații imaginare.", ex: { en: "I would like a coffee.", fon: "ai uud laic a cofi", ro: "Aș dori o cafea." } },
];

const PREPOZITII = [
  {
    prep: "IN",
    regula: "Pentru perioade „mari”: luni, ani, anotimpuri, părți ale zilei, țări și orașe.",
    exemple: [
      { en: "in July", fon: "in giulái", ro: "în iulie" },
      { en: "in 2026", fon: "in tuenti-tuenti-six", ro: "în 2026" },
      { en: "in the morning", fon: "in dă morning", ro: "dimineața" },
      { en: "in Romania", fon: "in Romeinia", ro: "în România" },
    ],
  },
  {
    prep: "ON",
    regula: "Pentru zile și date exacte — și pentru suprafețe (pe masă, pe perete).",
    exemple: [
      { en: "on Monday", fon: "on mandei", ro: "luni" },
      { en: "on the 5th of May", fon: "on dă fift ov mei", ro: "pe 5 mai" },
      { en: "on my birthday", fon: "on mai bărtdei", ro: "de ziua mea" },
      { en: "on the table", fon: "on dă teibăl", ro: "pe masă" },
    ],
  },
  {
    prep: "AT",
    regula: "Pentru ore exacte și „puncte” precise: la serviciu, acasă, la ușă.",
    exemple: [
      { en: "at 5 o'clock", fon: "et faiv oclóc", ro: "la ora 5" },
      { en: "at noon", fon: "et nuun", ro: "la prânz" },
      { en: "at work", fon: "et uărc", ro: "la serviciu" },
      { en: "at home", fon: "et hom", ro: "acasă" },
    ],
  },
];

// ================= CONT & SINCRONIZARE =================
// Îmbină progresul local cu cel din cloud fără să piardă nimic din niciunul
function imbinaProgres(local, cloud) {
  const a = local || {}, b = cloud || {};
  const uniuneFraze = (x = [], y = []) => {
    const vazute = new Set();
    return [...x, ...y].filter((f) => f && f.en && !vazute.has(f.en) && vazute.add(f.en));
  };
  const puterea = {};
  new Set([...Object.keys(a.puterea || {}), ...Object.keys(b.puterea || {})]).forEach((k) => {
    const p = (a.puterea || {})[k] || { corecte: 0, gresite: 0 };
    const q = (b.puterea || {})[k] || { corecte: 0, gresite: 0 };
    puterea[k] = { corecte: Math.max(p.corecte || 0, q.corecte || 0), gresite: Math.max(p.gresite || 0, q.gresite || 0) };
  });
  return {
    invatate: uniuneFraze(a.invatate, b.invatate),
    lectiiCitite: { ...(b.lectiiCitite || {}), ...(a.lectiiCitite || {}) },
    puterea,
    zileLectie: { ...(b.zileLectie || {}), ...(a.zileLectie || {}) },
    favorite: { ...(b.favorite || {}), ...(a.favorite || {}) },
    zileVizitate: [...new Set([...(a.zileVizitate || []), ...(b.zileVizitate || [])])].sort(),
  };
}

function mesajEroareAuth(e) {
  const cod = String((e && e.code) || "");
  const msg = String((e && e.message) || "").toLowerCase();
  const status = e && e.status;
  if (cod.includes("invalid_credentials") || msg.includes("invalid login")) return "Utilizator sau parolă greșite.";
  if (msg.includes("email not confirmed")) return "Contul nu e confirmat încă. Anunță-l pe cel care ți-a făcut contul.";
  if (cod.includes("over_request_rate") || status === 429) return "Prea multe încercări. Așteaptă puțin și reîncearcă.";
  if (msg.includes("failed to fetch") || msg.includes("network")) return "Nu e conexiune la internet. Încearcă mai târziu.";
  return "Ceva n-a mers. Verifică utilizatorul și parola.";
}

// ================= AUDIO =================
function vorbeste(text, lent = false) {
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = lent ? 0.6 : 0.82;
    const voci = window.speechSynthesis.getVoices();
    const v = voci.find((x) => x.lang.startsWith("en") && x.localService) || voci.find((x) => x.lang.startsWith("en"));
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

// ================= SALVARE PROGRES (localStorage + fallback) =================
const CHEIE_STOCARE = "engleza-mama-v1";

const stocare = (() => {
  try {
    const t = "__test__";
    window.localStorage.setItem(t, t);
    window.localStorage.removeItem(t);
    return {
      citeste: () => {
        try { return JSON.parse(window.localStorage.getItem(CHEIE_STOCARE)) || {}; }
        catch (e) { return {}; }
      },
      scrie: (d) => {
        try { window.localStorage.setItem(CHEIE_STOCARE, JSON.stringify(d)); }
        catch (e) {}
      },
      permanent: true,
    };
  } catch (e) {
    let mem = {};
    return { citeste: () => mem, scrie: (d) => { mem = d; }, permanent: false };
  }
})();

function aziISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function calculeazaStreak(zile) {
  const set = new Set(zile);
  let streak = 0;
  const d = new Date();
  while (set.has(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`)) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

// ================= STILURI =================
const C = {
  fundal: "#F0F6F6",
  cerneala: "#0F6D74",        // turcoazul închis — culoarea principală
  cernealaDeschis: "#3E9AA0",
  turcoaz: "#5DC3C3",         // turcoazul din logo (globul)
  hartie: "#FFFFFF",
  coral: "#DD6274",           // coralul din logo (banda)
  galben: "#F0A93B",
  galbenInchis: "#A97613",    // galben lizibil ca text pe alb
  verde: "#2E8F6B",
  rosuBland: "#D2566A",
  mov: "#7C63AD",
  textSecundar: "#5A727A",
};

const stilFonturi = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Caveat:wght@600;700&display=swap');
  * { -webkit-tap-highlight-color: transparent; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
`;

const fN = "'Nunito', sans-serif";
const fC = "'Caveat', cursive";

function BtnMare({ children, onClick, culoare = C.cerneala, textCuloare = "#fff", stil = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", minHeight: 64, borderRadius: 18, border: "none",
        background: culoare, color: textCuloare, fontFamily: fN, fontWeight: 800,
        fontSize: 20, cursor: "pointer", boxShadow: "0 3px 0 rgba(0,0,0,0.12)",
        padding: "14px 18px", transition: "transform .08s", ...stil,
      }}
      onPointerDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

function Antet({ titlu, inapoi }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
      <button
        onClick={inapoi}
        style={{ width: 52, height: 52, borderRadius: 16, border: "none", background: C.hartie, fontSize: 24, color: C.cerneala, cursor: "pointer", boxShadow: "0 2px 6px rgba(15,109,116,0.1)", fontWeight: 900, flexShrink: 0 }}
        aria-label="Înapoi"
      >
        ←
      </button>
      <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 21, color: C.cerneala, lineHeight: 1.2 }}>{titlu}</div>
    </div>
  );
}


const TIPURI_CARD_LECTIE = [
  { eticheta: "Ideea principală", icon: "💡", fundal: "#EEF8F6" },
  { eticheta: "Ține minte", icon: "🧠", fundal: "#F3F1FB" },
  { eticheta: "Cum o folosești", icon: "✨", fundal: "#FFF7E8" },
  { eticheta: "Un pas mai departe", icon: "🌿", fundal: "#F2F7FF" },
];

function fragmenteazaText(text) {
  const parti = text
    .split(/(?<=[.!?])\s+(?=[A-ZĂÂÎȘȚ„])/u)
    .map((x) => x.trim())
    .filter(Boolean);
  return parti.length > 1 ? parti : [text];
}

function CardInvatare({ text, index, culoare }) {
  const tip = TIPURI_CARD_LECTIE[index % TIPURI_CARD_LECTIE.length];
  const fragmente = fragmenteazaText(text);
  return (
    <section
      style={{
        background: tip.fundal,
        border: `1px solid ${culoare}24`,
        borderRadius: 18,
        padding: "17px 17px 16px",
        boxShadow: "0 2px 8px rgba(15,109,116,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
        <div
          aria-hidden="true"
          style={{
            width: 34, height: 34, borderRadius: 11, background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, boxShadow: "0 1px 5px rgba(15,109,116,0.08)", flexShrink: 0,
          }}
        >
          {tip.icon}
        </div>
        <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 14, color: culoare, textTransform: "uppercase", letterSpacing: .7 }}>
          {tip.eticheta}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {fragmente.map((fragment, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
            {fragmente.length > 1 && (
              <span aria-hidden="true" style={{ color: culoare, fontWeight: 900, lineHeight: 1.55 }}>•</span>
            )}
            <div style={{ fontFamily: fN, fontSize: 17, color: "#2B4448", lineHeight: 1.55, fontWeight: 700 }}>
              {fragment}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BaraProgresLectie({ total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ flex: 1, height: 7, borderRadius: 999, background: "#DCEBEC", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 999, background: C.cernealaDeschis }} />
      </div>
      <div style={{ fontFamily: fN, fontSize: 13, fontWeight: 900, color: C.textSecundar, whiteSpace: "nowrap" }}>
        {total} idei scurte
      </div>
    </div>
  );
}

function ExempluRand({ f, culoare }) {
  return (
    <div style={{ background: "#F2F9F9", borderRadius: 14, padding: "13px 14px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 18, color: C.cerneala }}>{f.en}</div>
        <div style={{ fontFamily: fC, fontSize: 21, color: C.cernealaDeschis, lineHeight: 1.1 }}>{f.fon}</div>
        <div style={{ fontFamily: fN, fontSize: 15, color: C.textSecundar, fontWeight: 700 }}>{f.ro}</div>
      </div>
      <button
        onClick={() => vorbeste(f.en)}
        style={{ width: 52, height: 52, borderRadius: 13, border: "none", background: culoare || C.cerneala, color: "#fff", fontSize: 20, cursor: "pointer", flexShrink: 0 }}
        aria-label={`Ascultă: ${f.en}`}
      >
        🔊
      </button>
    </div>
  );
}

function VerbRand({ v }) {
  return (
    <div style={{ background: C.hartie, borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 6px rgba(15,109,116,0.06)" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 17, color: C.cerneala }}>{v.v1} → {v.v2} → {v.v3}</div>
        <div style={{ fontFamily: fC, fontSize: 20, color: C.cernealaDeschis, lineHeight: 1.1 }}>{v.fon}</div>
        <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700 }}>{v.ro}</div>
      </div>
      <button
        onClick={() => vorbeste(`${v.v1}, ${v.v2.replace("/", ", ")}, ${v.v3}`)}
        style={{ width: 50, height: 50, borderRadius: 12, border: "none", background: C.coral, color: "#fff", fontSize: 19, cursor: "pointer", flexShrink: 0 }}
        aria-label={`Ascultă: ${v.v1}`}
      >
        🔊
      </button>
    </div>
  );
}

// Căutare fără grija diacriticelor: „cat costa” găsește „Cât costă”
function normalizeaza(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function FrazaRand({ f, esteStea, peStea }) {
  return (
    <div style={{ background: C.hartie, borderRadius: 16, padding: "14px 16px", boxShadow: "0 2px 8px rgba(15,109,116,0.07)" }}>
      <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 19, color: C.cerneala }}>{f.en}</div>
      <div style={{ fontFamily: fC, fontSize: 22, color: C.cernealaDeschis, lineHeight: 1.1 }}>{f.fon}</div>
      <div style={{ fontFamily: fN, fontSize: 15, color: C.textSecundar, fontWeight: 700 }}>{f.ro}</div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={() => vorbeste(f.en)}
          style={{ flex: 1, minHeight: 46, borderRadius: 12, border: "none", background: C.cerneala, color: "#fff", fontFamily: fN, fontWeight: 800, fontSize: 15, cursor: "pointer" }}
          aria-label={`Ascultă: ${f.en}`}
        >
          🔊 Ascultă
        </button>
        <button
          onClick={() => vorbeste(f.en, true)}
          style={{ flex: 1, minHeight: 46, borderRadius: 12, border: "none", background: "#E4F0F1", color: C.cerneala, fontFamily: fN, fontWeight: 800, fontSize: 15, cursor: "pointer" }}
          aria-label={`Ascultă rar: ${f.en}`}
        >
          🐢 Mai rar
        </button>
        <button
          onClick={() => peStea(f)}
          style={{ width: 54, minHeight: 46, borderRadius: 12, border: esteStea ? "none" : "2px solid #DBEBEC", background: esteStea ? C.galben : "#FFFFFF", color: esteStea ? "#4A3208" : "#AAC2C4", fontSize: 20, cursor: "pointer", flexShrink: 0 }}
          aria-label={esteStea ? `Scoate de la favorite: ${f.en}` : `Adaugă la favorite: ${f.en}`}
        >
          {esteStea ? "⭐" : "☆"}
        </button>
      </div>
    </div>
  );
}

function CardFraza({ f }) {
  return (
    <div style={{ background: C.hartie, borderRadius: 20, padding: "26px 22px", boxShadow: "0 2px 10px rgba(15,109,116,0.08)", textAlign: "center" }}>
      <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 27, color: C.cerneala, lineHeight: 1.25 }}>{f.en}</div>
      <div style={{ fontFamily: fC, fontSize: 30, color: C.cernealaDeschis, marginTop: 10, borderBottom: `2px dashed ${C.cernealaDeschis}44`, display: "inline-block", padding: "0 8px 2px" }}>
        {f.fon}
      </div>
      <div style={{ fontFamily: fN, fontSize: 19, color: C.textSecundar, marginTop: 14, fontWeight: 700 }}>{f.ro}</div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <BtnMare onClick={() => vorbeste(f.en)} stil={{ flex: 1, minHeight: 58 }}>🔊 Ascultă</BtnMare>
        <BtnMare onClick={() => vorbeste(f.en, true)} culoare="#E4F0F1" textCuloare={C.cerneala} stil={{ flex: 1, minHeight: 58 }}>🐢 Mai rar</BtnMare>
      </div>
    </div>
  );
}

// ================= APLICAȚIA =================
export default function App() {
  const [ecran, setEcran] = useState("acasa");
  const [pas, setPas] = useState(0);
  // Încarcă progresul salvat + înregistrează vizita de azi
  const [dateSalvate] = useState(() => {
    const salvat = stocare.citeste();
    const zile = Array.isArray(salvat.zileVizitate) ? [...salvat.zileVizitate] : [];
    const azi = aziISO();
    if (!zile.includes(azi)) zile.push(azi);
    return { ...salvat, zileVizitate: zile };
  });
  const [invatate, setInvatate] = useState(dateSalvate.invatate || []);
  const [zileVizitate, setZileVizitate] = useState(dateSalvate.zileVizitate);
  const [zileLectie, setZileLectie] = useState(dateSalvate.zileLectie || {}); // { "2026-07-08": true }
  const lectiaAzi = lectiaZilei();
  const lectiaFacutaAzi = !!zileLectie[aziISO()];
  const streak = calculeazaStreak(zileVizitate);
  // Cont & cloud
  const [cloud, setCloud] = useState(null);
  const [cloudStare, setCloudStare] = useState("se-verifica"); // gata | neconfigurat | indisponibil
  const [cont, setCont] = useState(null); // { uid, email }
  const [authEmail, setAuthEmail] = useState("");
  const [authParola, setAuthParola] = useState("");
  const [authMesaj, setAuthMesaj] = useState("");
  const [confirmaStergerea, setConfirmaStergerea] = useState(false);
  const progresRef = useRef(null);
  const timerCloud = useRef(null);
  const [categorie, setCategorie] = useState(null);
  const [revIdx, setRevIdx] = useState(0);
  const [revArata, setRevArata] = useState(false);
  const [revStiute, setRevStiute] = useState(0);
  const [revDeck, setRevDeck] = useState([]);
  const [puterea, setPuterea] = useState(dateSalvate.puterea || {}); // { "fraza en": { corecte, gresite } }
  // Curriculum
  const [nivelSel, setNivelSel] = useState(null);
  const [lectieSel, setLectieSel] = useState(null);
  const [quiz, setQuiz] = useState(null); // { intrebari, idx, ales, scor }
  const [ghidSel, setGhidSel] = useState(null); // "verbe" | "timpuri" | "prepozitii"
  const [cautaVerb, setCautaVerb] = useState("");
  const [cautaFraza, setCautaFraza] = useState("");
  const [favorite, setFavorite] = useState(dateSalvate.favorite || {}); // { "fraza en": true }
  const [lectiiCitite, setLectiiCitite] = useState(dateSalvate.lectiiCitite || {});
  // Profesor AI (chat)
  const [profMesaje, setProfMesaje] = useState([]); // { rol: "user" | "profesor", text }
  const [profInput, setProfInput] = useState("");
  const [profBusy, setProfBusy] = useState(false);
  const [profMod, setProfMod] = useState("chat"); // "chat" | "corecteaza"
  const [profDeschis, setProfDeschis] = useState(false); // fereastra de chat (pop-up global)
  const profBodyRef = useRef(null);

  useEffect(() => { window.speechSynthesis?.getVoices(); }, []);
  // auto-scroll la ultimul mesaj în fereastra profesorului
  useEffect(() => { if (profDeschis && profBodyRef.current) profBodyRef.current.scrollTop = profBodyRef.current.scrollHeight; }, [profMesaje, profBusy, profDeschis]);

  const trimiteProfesor = async (textDat) => {
    const text = String(textDat != null ? textDat : profInput).trim();
    if (!text || profBusy || !cloud) return;
    const noua = [...profMesaje, { rol: "user", text }];
    setProfMesaje(noua);
    setProfInput("");
    setProfBusy(true);
    try {
      const { data, error } = await cloud.client().functions.invoke("profesor", { body: { mod: profMod, mesaje: noua } });
      if (error || !data || !data.ok) throw new Error((data && data.error) || "eroare");
      // curăță eventualele asteriscuri markdown ca să nu apară brute
      const curat = String(data.text).replace(/\*+/g, "");
      setProfMesaje((prev) => [...prev, { rol: "profesor", text: curat }]);
    } catch (e) {
      setProfMesaje((prev) => [...prev, { rol: "profesor", text: "Nu am putut răspunde acum. Verifică internetul și încearcă din nou. 🙏" }]);
    } finally {
      setProfBusy(false);
    }
  };

  // Salvează automat progresul: local instant, în cloud cu mică întârziere (dacă e cont)
  useEffect(() => {
    const date = { invatate, lectiiCitite, puterea, zileLectie, favorite, zileVizitate };
    progresRef.current = date;
    stocare.scrie(date);
    if (cont && cloud) {
      clearTimeout(timerCloud.current);
      timerCloud.current = setTimeout(() => { cloud.salveazaProgres(cont.uid, date).catch(() => {}); }, 1500);
    }
  }, [invatate, lectiiCitite, puterea, zileLectie, favorite, zileVizitate, cont, cloud]);

  // Conectarea la cloud (Firebase) — opțională: fără ea, aplicația merge normal, doar local
  useEffect(() => {
    let opreste = () => {};
    const porneste = (m) => {
      setCloud(m); setCloudStare("gata");
      opreste = m.asculta(async (u) => {
        setCont(u);
        if (u) {
          let dinCloud = null;
          try { dinCloud = await m.incarcaProgres(u.uid); } catch (e) {}
          const imbinat = imbinaProgres(progresRef.current, dinCloud);
          setInvatate(imbinat.invatate); setLectiiCitite(imbinat.lectiiCitite); setPuterea(imbinat.puterea);
          setZileLectie(imbinat.zileLectie); setFavorite(imbinat.favorite); setZileVizitate(imbinat.zileVizitate);
          m.salveazaProgres(u.uid, imbinat).catch(() => {});
        }
      });
    };
    if (typeof window !== "undefined" && window.__cloudPentruTeste) { porneste(window.__cloudPentruTeste); return () => opreste(); }
    import("./supabase.js")
      .then((m) => { if (m.esteConfigurat()) porneste(m); else setCloudStare("neconfigurat"); })
      .catch(() => setCloudStare("indisponibil"));
    return () => opreste();
  }, []);

  const ruleazaAuth = async (fn) => {
    setAuthMesaj("...");
    try { await fn(); setAuthMesaj(""); setAuthEmail(""); setAuthParola(""); }
    catch (e) { setAuthMesaj(mesajEroareAuth(e)); }
  };

  const nrDeExersat = itemeInvatate(lectiiCitite, invatate).length;
  const pornesteRepetitia = () => {
    setRevDeck(construiesteSesiune(itemeInvatate(lectiiCitite, invatate), puterea));
    setRevIdx(0); setRevStiute(0); setRevArata(false);
    setEcran("repeta");
  };
  const inapoiAcasa = () => { setEcran("acasa"); setPas(0); setRevIdx(0); setRevArata(false); setRevStiute(0); setNivelSel(null); setLectieSel(null); setQuiz(null); setGhidSel(null); setCautaVerb(""); setCategorie(null); setCautaFraza(""); setAuthMesaj(""); setConfirmaStergerea(false); };
  const totalCitite = Object.keys(lectiiCitite).length;
  const totalLectii = CURRICULUM.reduce((s, n) => s + n.lectii.length + (n.vocabular ? n.vocabular.length : 0), 0);

  // ═══════ POARTĂ DE LOGIN ═══════
  // Nicio pagină nu e accesibilă fără cont. Cât timp nu ești logat,
  // se afișează DOAR ecranul de intrare (sau un mesaj dacă backend-ul lipsește).
  if (cloudStare !== "gata" || !cont) {
    const camp = { width: "100%", boxSizing: "border-box", minHeight: 56, borderRadius: 14, border: "2px solid #D6E7E8", padding: "0 16px", fontFamily: fN, fontWeight: 700, fontSize: 17, color: C.cerneala, background: C.hartie, outline: "none" };
    const incearcaLogin = () => ruleazaAuth(() => cloud.intraEmail(authEmail.trim(), authParola));
    return (
      <div style={{ minHeight: "100vh", background: C.fundal, padding: "22px 16px 40px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{stilFonturi}</style>
        <div style={{ maxWidth: 380, width: "100%", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 22 }}>
            <img src="./icon-192.png" alt="" style={{ width: 84, height: 84, borderRadius: 22, boxShadow: "0 6px 18px rgba(15,109,116,0.2)" }} />
            <div style={{ fontFamily: fC, fontSize: 26, color: C.cernealaDeschis, marginTop: 14 }}>caietul meu de engleză</div>
            <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 27, color: C.cerneala, marginTop: 2 }}>Bine ai venit! 👋</div>
          </div>

          {cloudStare === "se-verifica" && (
            <div style={{ textAlign: "center", fontFamily: fN, fontWeight: 800, fontSize: 16, color: C.textSecundar, padding: "20px 0" }}>
              Se verifică...
            </div>
          )}

          {(cloudStare === "neconfigurat" || cloudStare === "indisponibil") && (
            <div style={{ background: C.hartie, borderRadius: 20, padding: "22px 20px", boxShadow: "0 2px 10px rgba(15,109,116,0.08)", textAlign: "center" }}>
              <div style={{ fontSize: 44 }}>☁️</div>
              <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 19, color: C.cerneala, marginTop: 8 }}>
                {cloudStare === "neconfigurat" ? "Aplicația nu e conectată încă" : "Momentan nu ne putem conecta"}
              </div>
              <div style={{ fontFamily: fN, fontSize: 15, color: C.textSecundar, fontWeight: 700, marginTop: 8, lineHeight: 1.5 }}>
                {cloudStare === "neconfigurat"
                  ? "Urmează pașii „Supabase” din README pentru a activa conturile."
                  : "Verifică internetul și reîncearcă în câteva momente."}
              </div>
            </div>
          )}

          {cloudStare === "gata" && !cont && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="Utilizator" autoCapitalize="none" autoCorrect="off" autoComplete="username" style={camp}
                onKeyDown={(e) => { if (e.key === "Enter") incearcaLogin(); }} />
              <input value={authParola} onChange={(e) => setAuthParola(e.target.value)} placeholder="Parolă" type="password" autoComplete="current-password" style={camp}
                onKeyDown={(e) => { if (e.key === "Enter") incearcaLogin(); }} />
              <BtnMare onClick={incearcaLogin}>Intră în cont</BtnMare>
              {authMesaj && (
                <div style={{ fontFamily: fN, fontWeight: 800, fontSize: 15, color: authMesaj === "..." ? C.textSecundar : C.rosuBland, textAlign: "center", marginTop: 4 }}>
                  {authMesaj === "..." ? "Se conectează..." : authMesaj}
                </div>
              )}
              <div style={{ fontFamily: fN, fontSize: 13.5, color: C.textSecundar, fontWeight: 700, textAlign: "center", marginTop: 6, lineHeight: 1.5 }}>
                Contul îl primești de la cel care ți-a trimis aplicația. Progresul se salvează în cont, pe orice telefon.
              </div>
              <div style={{ textAlign: "center" }}>
                <button onClick={() => window.open("./privacy.html", "_blank")} style={{ background: "none", border: "none", color: C.cernealaDeschis, fontFamily: fN, fontWeight: 800, fontSize: 13.5, cursor: "pointer", textDecoration: "underline", marginTop: 8 }}>
                  Politica de confidențialitate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.fundal, padding: "22px 16px 40px", boxSizing: "border-box" }}>
      <style>{stilFonturi}</style>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>

        {/* ---------- ACASĂ ---------- */}
        {ecran === "acasa" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontFamily: fC, fontSize: 26, color: C.cernealaDeschis }}>caietul meu de engleză</div>
              <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 32, color: C.cerneala, marginTop: 2 }}>Bună dimineața! ☀️</div>
            </div>

            <div style={{ background: C.hartie, borderRadius: 18, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "18px 0", boxShadow: "0 2px 10px rgba(15,109,116,0.08)" }}>
              <div style={{ fontFamily: fN, fontWeight: 800, fontSize: 17, color: C.textSecundar }}>
                {streak === 1 ? "Prima zi — bun venit!" : `${streak} zile la rând`}
              </div>
              <div style={{ fontSize: 22 }}>{"⭐".repeat(Math.min(streak, 7))}{streak > 7 ? ` ×${streak}` : ""}</div>
            </div>
            {!stocare.permanent && (
              <div style={{ fontFamily: fN, fontSize: 13, fontWeight: 700, color: C.textSecundar, textAlign: "center", marginTop: -8, marginBottom: 10 }}>
                mod previzualizare — progresul se va salva permanent în versiunea publicată
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <BtnMare onClick={() => setEcran("lectie")} stil={{ minHeight: 80, fontSize: 21 }}>
                📖 Lecția de azi
                <div style={{ fontSize: 15, fontWeight: 700, opacity: 0.85, marginTop: 3 }}>
                  {lectiaFacutaAzi ? `✓ „${lectiaAzi.titlu}” — făcută azi, bravo!` : `${lectiaAzi.titlu} · 5 minute`}
                </div>
              </BtnMare>
              <BtnMare onClick={() => setEcran("curriculum")} culoare={C.mov} stil={{ minHeight: 80, fontSize: 21 }}>
                🎓 Lecții
                <div style={{ fontSize: 15, fontWeight: 700, opacity: 0.85, marginTop: 3 }}>Toată materia, de la A1 la C2</div>
              </BtnMare>
              <BtnMare onClick={pornesteRepetitia} culoare={C.verde} stil={{ minHeight: 80, fontSize: 21 }}>
                🔁 Repetă
                <div style={{ fontSize: 15, fontWeight: 700, opacity: 0.85, marginTop: 3 }}>
                  {nrDeExersat > 0 ? `${nrDeExersat} fraze și cuvinte învățate` : "Exersează ce ai învățat"}
                </div>
              </BtnMare>
              <BtnMare onClick={() => setEcran("fraze")} culoare={C.galben} textCuloare="#4A3208" stil={{ minHeight: 80, fontSize: 21 }}>
                💬 Fraze utile
                <div style={{ fontSize: 15, fontWeight: 700, opacity: 0.85, marginTop: 3 }}>94 de fraze pe situații + căutare</div>
              </BtnMare>
              <BtnMare onClick={() => setEcran("ghid")} culoare={C.coral} stil={{ minHeight: 80, fontSize: 21 }}>
                📖 Ghid rapid
                <div style={{ fontSize: 15, fontWeight: 700, opacity: 0.85, marginTop: 3 }}>Verbe neregulate, timpuri, prepoziții</div>
              </BtnMare>
              <BtnMare onClick={() => setProfDeschis(true)} culoare={C.cernealaDeschis} stil={{ minHeight: 80, fontSize: 21 }}>
                🧑‍🏫 Profesorul meu
                <div style={{ fontSize: 15, fontWeight: 700, opacity: 0.85, marginTop: 3 }}>Întreabă orice · corectează-ți propozițiile</div>
              </BtnMare>
            </div>

            <button
              onClick={() => setEcran("caiet")}
              style={{ width: "100%", marginTop: 14, minHeight: 56, borderRadius: 16, border: `2px dashed ${C.turcoaz}`, background: "transparent", color: C.cernealaDeschis, fontFamily: fN, fontWeight: 800, fontSize: 17, cursor: "pointer" }}
            >
              📔 Caietul meu — tot progresul tău
            </button>
            <button
              onClick={() => setEcran("cont")}
              style={{ width: "100%", marginTop: 10, minHeight: 48, borderRadius: 14, border: "none", background: "transparent", color: C.textSecundar, fontFamily: fN, fontWeight: 800, fontSize: 15, cursor: "pointer" }}
            >
              {cont ? `☁️ ${cont.username} · progres sincronizat` : "☁️ Contul meu"}
            </button>
          </div>
        )}

        {/* ---------- CURRICULUM: NIVELURI ---------- */}
        {ecran === "curriculum" && !nivelSel && (
          <div>
            <Antet titlu="Lecții · A1 → C2" inapoi={inapoiAcasa} />
            <div style={{ fontFamily: fN, fontSize: 15, color: C.textSecundar, fontWeight: 700, marginBottom: 14 }}>
              Drumul complet, pas cu pas. Începe cu A1 și urcă în ritmul tău. 📚 {totalCitite} din {totalLectii} lecții citite.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CURRICULUM.map((niv) => {
                const totalNiv = niv.lectii.length + (niv.vocabular ? niv.vocabular.length : 0);
                const citite = niv.lectii.filter((_, i) => lectiiCitite[`${niv.nivel}-${i}`]).length
                  + (niv.vocabular ? niv.vocabular.filter((_, i) => lectiiCitite[`${niv.nivel}-v${i}`]).length : 0);
                return (
                  <button
                    key={niv.nivel}
                    onClick={() => setNivelSel(niv)}
                    style={{ background: C.hartie, border: "none", borderRadius: 18, padding: "16px 18px", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 8px rgba(15,109,116,0.08)", display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div style={{ width: 58, height: 58, borderRadius: 16, background: niv.culoare, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: fN }}>
                      <div style={{ fontWeight: 900, fontSize: 18 }}>{niv.nivel}</div>
                      <div style={{ fontSize: 15, lineHeight: 1 }}>{niv.emoji}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 19, color: C.cerneala }}>{niv.nume}</div>
                      <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700, lineHeight: 1.3 }}>{niv.descriere}</div>
                      <div style={{ fontFamily: fN, fontSize: 13, color: niv.culoare, fontWeight: 800, marginTop: 4 }}>
                        {citite} / {totalNiv} lecții
                      </div>
                    </div>
                    <div style={{ fontSize: 22, color: C.textSecundar }}>›</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------- CURRICULUM: LISTA LECȚIILOR ---------- */}
        {ecran === "curriculum" && nivelSel && !lectieSel && (
          <div>
            <Antet titlu={`${nivelSel.nivel} · ${nivelSel.nume} ${nivelSel.emoji}`} inapoi={() => setNivelSel(null)} />
            <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 15, color: C.textSecundar, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px 4px" }}>
              ✏️ Gramatică
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {nivelSel.lectii.map((lec, i) => {
                const citita = lectiiCitite[`${nivelSel.nivel}-${i}`];
                return (
                  <button
                    key={i}
                    onClick={() => setLectieSel({ ...lec, idx: i })}
                    style={{ background: C.hartie, border: "none", borderRadius: 16, padding: "15px 16px", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 8px rgba(15,109,116,0.07)", display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: citita ? nivelSel.culoare : "#DBEBEC", color: citita ? "#fff" : C.textSecundar, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fN, fontWeight: 900, fontSize: 17, flexShrink: 0 }}>
                      {citita ? "✓" : i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 17, color: C.cerneala, lineHeight: 1.2 }}>{lec.titlu}</div>
                      <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700 }}>{lec.subtitlu}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {nivelSel.vocabular && nivelSel.vocabular.length > 0 && (
              <>
                <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 15, color: C.textSecundar, textTransform: "uppercase", letterSpacing: 1, margin: "22px 0 10px 4px" }}>
                  📚 Vocabular tematic
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {nivelSel.vocabular.map((mod, i) => {
                    const citita = lectiiCitite[`${nivelSel.nivel}-v${i}`];
                    return (
                      <button
                        key={i}
                        onClick={() => setLectieSel({ titlu: mod.titlu, subtitlu: mod.subtitlu, explicatie: [mod.intro], exemple: mod.cuvinte, sfat: mod.sfat, idx: `v${i}` })}
                        style={{ background: C.hartie, border: "none", borderRadius: 16, padding: "15px 16px", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 8px rgba(15,109,116,0.07)", display: "flex", alignItems: "center", gap: 12 }}
                      >
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: citita ? nivelSel.culoare : "#DBEBEC", color: citita ? "#fff" : C.textSecundar, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fN, fontWeight: 900, fontSize: 16, flexShrink: 0 }}>
                          {citita ? "✓" : "Aa"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 17, color: C.cerneala, lineHeight: 1.2 }}>{mod.titlu}</div>
                          <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700 }}>{mod.cuvinte.length} cuvinte · {mod.subtitlu}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ---------- CURRICULUM: LECȚIA DESCHISĂ ---------- */}
        {ecran === "curriculum" && nivelSel && lectieSel && !quiz && (
          <div>
            <Antet titlu={lectieSel.titlu} inapoi={() => setLectieSel(null)} />
            <BaraProgresLectie total={lectieSel.explicatie.length} />

            <div style={{ background: C.hartie, borderRadius: 22, padding: "20px 16px", boxShadow: "0 2px 10px rgba(15,109,116,0.08)" }}>
              <div style={{ fontFamily: fC, fontSize: 26, lineHeight: 1.15, color: nivelSel.culoare, marginBottom: 16 }}>
                {lectieSel.subtitlu}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {lectieSel.explicatie.map((p, i) => (
                  <CardInvatare key={i} text={p} index={i} culoare={nivelSel.culoare} />
                ))}
              </div>

              <div style={{ margin: "24px 0 11px" }}>
                <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 18, color: C.cerneala }}>
                  Ascultă și repetă
                </div>
                <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700, marginTop: 2 }}>
                  Apasă pe difuzor și spune fiecare exemplu cu voce tare de 3 ori.
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {lectieSel.exemple.map((f, i) => <ExempluRand key={i} f={f} culoare={nivelSel.culoare} />)}
              </div>

              {lectieSel.sfat && (
                <aside style={{ marginTop: 18, background: "#FFF7E8", border: "1px solid #F3DDAE", borderRadius: 17, padding: "15px 16px", color: "#6F531D" }}>
                  <div style={{ fontFamily: fN, fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: .8, marginBottom: 5 }}>
                    ⭐ Regula de aur
                  </div>
                  <div style={{ fontFamily: fN, fontSize: 16, fontWeight: 800, lineHeight: 1.5 }}>
                    {lectieSel.sfat}
                  </div>
                </aside>
              )}
            </div>

            <div style={{ marginTop: 16 }}>
              <BtnMare
                culoare={nivelSel.culoare}
                onClick={() => setQuiz({ intrebari: construiesteQuiz(lectieSel), idx: 0, ales: null, scor: 0 })}
              >
                ✏️ Verifică ce ai învățat
              </BtnMare>
            </div>
          </div>
        )}

        {/* ---------- CURRICULUM: EXERCIȚIUL ---------- */}
        {ecran === "curriculum" && nivelSel && lectieSel && quiz && quiz.idx < quiz.intrebari.length && (() => {
          const q = quiz.intrebari[quiz.idx];
          const raspuns = quiz.ales !== null;
          return (
            <div>
              <Antet titlu={`Exercițiu · ${quiz.idx + 1} din ${quiz.intrebari.length}`} inapoi={() => setQuiz(null)} />
              <div style={{ background: C.hartie, borderRadius: 20, padding: "24px 20px", boxShadow: "0 2px 10px rgba(15,109,116,0.08)" }}>
                <div style={{ fontFamily: fN, fontSize: 15, fontWeight: 800, color: C.textSecundar, textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>
                  {q.tip === "en-ro" ? "Ce înseamnă în română?" : "Cum spui în engleză?"}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 12 }}>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 24, color: C.cerneala, textAlign: "center" }}>{q.intrebare}</div>
                  {q.tip === "en-ro" && (
                    <button onClick={() => vorbeste(q.audio)} style={{ width: 46, height: 46, borderRadius: 12, border: "none", background: nivelSel.culoare, color: "#fff", fontSize: 18, cursor: "pointer", flexShrink: 0 }} aria-label="Ascultă">🔊</button>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
                  {q.optiuni.map((opt, i) => {
                    const eCorect = opt === q.corect;
                    let fundal = "#F2F9F9", culoareTxt = C.cerneala, bordura = "2px solid #DBEBEC";
                    if (raspuns && eCorect) { fundal = "#E3F5EE"; culoareTxt = C.verde; bordura = `2px solid ${C.verde}`; }
                    else if (raspuns && quiz.ales === opt && !eCorect) { fundal = "#FCEDEF"; culoareTxt = C.rosuBland; bordura = `2px solid ${C.rosuBland}`; }
                    return (
                      <button
                        key={i}
                        disabled={raspuns}
                        onClick={() => {
                          const corect = opt === q.corect;
                          setQuiz({ ...quiz, ales: opt, scor: quiz.scor + (corect ? 1 : 0) });
                          if (q.tip === "ro-en" && corect) vorbeste(opt);
                        }}
                        style={{ width: "100%", minHeight: 58, borderRadius: 14, border: bordura, background: fundal, color: culoareTxt, fontFamily: fN, fontWeight: 800, fontSize: 17, cursor: raspuns ? "default" : "pointer", padding: "12px 14px", textAlign: "left" }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {raspuns && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontFamily: fN, fontWeight: 800, fontSize: 16, textAlign: "center", color: quiz.ales === q.corect ? C.verde : C.rosuBland, marginBottom: 12 }}>
                      {quiz.ales === q.corect ? "Corect! Bravo! 🎉" : "Aproape! Răspunsul corect e cel verde. 💪"}
                    </div>
                    <BtnMare culoare={nivelSel.culoare} onClick={() => setQuiz({ ...quiz, idx: quiz.idx + 1, ales: null })}>
                      {quiz.idx === quiz.intrebari.length - 1 ? "Vezi rezultatul →" : "Următoarea →"}
                    </BtnMare>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ---------- CURRICULUM: REZULTATUL EXERCIȚIULUI ---------- */}
        {ecran === "curriculum" && nivelSel && lectieSel && quiz && quiz.idx >= quiz.intrebari.length && (() => {
          const prag = Math.ceil(quiz.intrebari.length * 0.75);
          const trecut = quiz.scor >= prag;
          return (
            <div style={{ textAlign: "center", paddingTop: 30 }}>
              <div style={{ fontSize: 64 }}>{trecut ? "🎉" : "🌱"}</div>
              <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 28, color: C.cerneala, marginTop: 10 }}>
                {trecut ? "Lecție învățată!" : "Aproape!"}
              </div>
              <div style={{ fontFamily: fN, fontSize: 19, color: C.textSecundar, marginTop: 8, fontWeight: 700 }}>
                Ai răspuns corect la {quiz.scor} din {quiz.intrebari.length} întrebări.
                {!trecut && <><br />Mai citește lecția o dată — a doua oară merge mai ușor!</>}
              </div>
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                {trecut ? (
                  <BtnMare
                    culoare={C.verde}
                    onClick={() => {
                      setLectiiCitite({ ...lectiiCitite, [`${nivelSel.nivel}-${lectieSel.idx}`]: { scor: quiz.scor, din: quiz.intrebari.length } });
                      setQuiz(null);
                      setLectieSel(null);
                    }}
                  >
                    ✔ Bifează lecția și continuă
                  </BtnMare>
                ) : (
                  <>
                    <BtnMare culoare={nivelSel.culoare} onClick={() => setQuiz(null)}>📖 Recitește lecția</BtnMare>
                    <BtnMare culoare="#E4F0F1" textCuloare={C.cerneala} onClick={() => setQuiz({ intrebari: construiesteQuiz(lectieSel), idx: 0, ales: null, scor: 0 })}>
                      🔁 Reia exercițiul
                    </BtnMare>
                  </>
                )}
              </div>
            </div>
          );
        })()}

        {/* ---------- LECȚIA DE AZI ---------- */}
        {ecran === "lectie" && pas < lectiaAzi.fraze.length && (
          <div>
            <Antet titlu={`${lectiaAzi.titlu} · ${pas + 1} din ${lectiaAzi.fraze.length}`} inapoi={inapoiAcasa} />
            <div style={{ height: 10, background: "#D6E7E8", borderRadius: 6, marginBottom: 20 }}>
              <div style={{ height: "100%", width: `${((pas + 1) / lectiaAzi.fraze.length) * 100}%`, background: C.verde, borderRadius: 6, transition: "width .3s" }} />
            </div>
            <CardFraza f={lectiaAzi.fraze[pas]} />
            <div style={{ marginTop: 16 }}>
              <BtnMare culoare={C.verde} onClick={() => setPas(pas + 1)}>
                {pas === lectiaAzi.fraze.length - 1 ? "Gata! ✔" : "Următoarea →"}
              </BtnMare>
            </div>
          </div>
        )}

        {ecran === "lectie" && pas >= lectiaAzi.fraze.length && (
          <div style={{ textAlign: "center", paddingTop: 40 }}>
            <div style={{ fontSize: 64 }}>🎉</div>
            <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 28, color: C.cerneala, marginTop: 10 }}>Bravo!</div>
            <div style={{ fontFamily: fN, fontSize: 19, color: C.textSecundar, marginTop: 8, fontWeight: 700 }}>
              Ai terminat lecția de azi.<br />{lectiaAzi.fraze.length} fraze noi în caietul tău!
            </div>
            <div style={{ marginTop: 28 }}>
              <BtnMare
                onClick={() => {
                  const noi = lectiaAzi.fraze.filter((f) => !invatate.some((x) => x.en === f.en));
                  setInvatate([...invatate, ...noi]);
                  setZileLectie({ ...zileLectie, [aziISO()]: true });
                  inapoiAcasa();
                }}
              >
                Înapoi acasă
              </BtnMare>
            </div>
          </div>
        )}

        {/* ---------- REPETĂ: NIMIC ÎNVĂȚAT ÎNCĂ ---------- */}
        {ecran === "repeta" && revDeck.length === 0 && (
          <div>
            <Antet titlu="Repetă" inapoi={inapoiAcasa} />
            <div style={{ textAlign: "center", paddingTop: 30 }}>
              <div style={{ fontSize: 64 }}>📖</div>
              <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 26, color: C.cerneala, marginTop: 10 }}>Încă nimic de repetat</div>
              <div style={{ fontFamily: fN, fontSize: 18, color: C.textSecundar, marginTop: 8, fontWeight: 700, lineHeight: 1.5 }}>
                Termină întâi Lecția de azi sau o lecție din 🎓 Lecții.<br />Tot ce înveți acolo ajunge automat aici, la exersat.
              </div>
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                <BtnMare onClick={() => { setEcran("lectie"); }}>📖 Începe Lecția de azi</BtnMare>
                <BtnMare culoare={C.mov} onClick={() => { setEcran("curriculum"); }}>🎓 Mergi la Lecții</BtnMare>
              </div>
            </div>
          </div>
        )}

        {/* ---------- REPETĂ: SESIUNEA ---------- */}
        {ecran === "repeta" && revDeck.length > 0 && revIdx < revDeck.length && (() => {
          const it = revDeck[revIdx];
          const enRo = it.tip === "en-ro";
          return (
            <div>
              <Antet titlu={`Repetă · ${revIdx + 1} din ${revDeck.length}`} inapoi={inapoiAcasa} />
              <div style={{ background: C.hartie, borderRadius: 20, padding: "30px 22px", textAlign: "center", boxShadow: "0 2px 10px rgba(15,109,116,0.08)" }}>
                <div style={{ fontFamily: fN, fontSize: 16, fontWeight: 800, color: C.textSecundar, textTransform: "uppercase", letterSpacing: 1 }}>
                  {enRo ? "Ce înseamnă în română?" : "Cum spui în engleză?"}
                </div>
                {it.requeued && (
                  <div style={{ fontFamily: fN, fontSize: 14, fontWeight: 800, color: C.galbenInchis, marginTop: 6 }}>🔁 încă o dată — acum o prinzi!</div>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 12 }}>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 26, color: C.cerneala }}>
                    {enRo ? it.en : it.ro}
                  </div>
                  {enRo && (
                    <button onClick={() => vorbeste(it.en)} style={{ width: 46, height: 46, borderRadius: 12, border: "none", background: C.verde, color: "#fff", fontSize: 18, cursor: "pointer", flexShrink: 0 }} aria-label="Ascultă">🔊</button>
                  )}
                </div>
                {enRo && <div style={{ fontFamily: fC, fontSize: 24, color: C.cernealaDeschis, marginTop: 4 }}>{it.fon}</div>}

                {!revArata ? (
                  <div style={{ marginTop: 24 }}>
                    <BtnMare onClick={() => { setRevArata(true); if (!enRo) vorbeste(it.en); }}>👀 Arată răspunsul</BtnMare>
                  </div>
                ) : (
                  <div style={{ marginTop: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 24, color: C.verde }}>{enRo ? it.ro : it.en}</div>
                      {!enRo && (
                        <button onClick={() => vorbeste(it.en)} style={{ width: 46, height: 46, borderRadius: 12, border: "none", background: C.verde, color: "#fff", fontSize: 18, cursor: "pointer", flexShrink: 0 }} aria-label="Ascultă răspunsul">🔊</button>
                      )}
                    </div>
                    {!enRo && <div style={{ fontFamily: fC, fontSize: 27, color: C.cernealaDeschis, marginTop: 6 }}>{it.fon}</div>}
                    <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                      <BtnMare
                        culoare={C.verde}
                        onClick={() => {
                          const s = puterea[it.en] || { corecte: 0, gresite: 0 };
                          setPuterea({ ...puterea, [it.en]: { ...s, corecte: s.corecte + 1 } });
                          setRevStiute(revStiute + 1); setRevIdx(revIdx + 1); setRevArata(false);
                        }}
                        stil={{ flex: 1 }}
                      >
                        😊 Am știut
                      </BtnMare>
                      <BtnMare
                        culoare={C.rosuBland}
                        onClick={() => {
                          const s = puterea[it.en] || { corecte: 0, gresite: 0 };
                          setPuterea({ ...puterea, [it.en]: { ...s, gresite: s.gresite + 1 } });
                          if (!it.requeued) setRevDeck([...revDeck, { ...it, requeued: true }]);
                          setRevIdx(revIdx + 1); setRevArata(false);
                        }}
                        stil={{ flex: 1 }}
                      >
                        🤔 Mai exersez
                      </BtnMare>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {ecran === "repeta" && revDeck.length > 0 && revIdx >= revDeck.length && (
          <div style={{ textAlign: "center", paddingTop: 40 }}>
            <div style={{ fontSize: 64 }}>🌟</div>
            <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 28, color: C.cerneala, marginTop: 10 }}>Excelent!</div>
            <div style={{ fontFamily: fN, fontSize: 19, color: C.textSecundar, marginTop: 8, fontWeight: 700 }}>
              Ai știut {revStiute} din {revDeck.length} răspunsuri.
              <br />Ce ai greșit va reveni mai des — așa se învață. 🧠
            </div>
            {nrDeExersat < 12 && (
              <div style={{ fontFamily: fN, fontSize: 15, fontWeight: 700, marginTop: 14, background: "#FFF6E5", borderRadius: 14, padding: "12px 16px", lineHeight: 1.5, color: "#7A5A1E" }}>
                💡 Aici exersezi ce ai învățat deja — deocamdată {nrDeExersat} {nrDeExersat === 1 ? "lucru" : "lucruri"}. Fiecare lecție bifată în 🎓 Lecții adaugă întrebări noi!
              </div>
            )}
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              <BtnMare culoare={C.verde} onClick={pornesteRepetitia}>🔁 Încă o rundă</BtnMare>
              <BtnMare culoare="#E4F0F1" textCuloare={C.cerneala} onClick={inapoiAcasa}>Înapoi acasă</BtnMare>
            </div>
          </div>
        )}

        {/* ---------- CAIETUL MEU (STATISTICI) ---------- */}
        {ecran === "caiet" && (() => {
          const zileTotal = zileVizitate.length;
          const lectiiZilniceFacute = Object.keys(zileLectie).length;
          const stiuteBine = Object.values(puterea).filter((s) => s.corecte >= 3 && s.corecte > s.gresite).length;
          const deExersat = Object.values(puterea).filter((s) => s.gresite > 0 && s.gresite >= s.corecte).length;
          const procent = totalLectii > 0 ? Math.round((totalCitite / totalLectii) * 100) : 0;
          const mesaj =
            procent === 0 ? "Călătoria începe cu prima lecție. 🌱"
            : procent < 25 ? "Ai pornit la drum — fiecare zi contează!"
            : procent < 50 ? "Un sfert din drum e în urmă. Se vede munca!"
            : procent < 75 ? "Mai mult de jumătate! Engleza prinde rădăcini."
            : procent < 100 ? "Aproape de vârf — nu te opri acum!"
            : "Ai terminat toată materia! 👑 Ești extraordinară!";
          const Statistica = ({ emoji, valoare, eticheta }) => (
            <div style={{ background: C.hartie, borderRadius: 16, padding: "16px 10px", textAlign: "center", boxShadow: "0 2px 8px rgba(15,109,116,0.07)", flex: 1 }}>
              <div style={{ fontSize: 26 }}>{emoji}</div>
              <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 24, color: C.cerneala, marginTop: 2 }}>{valoare}</div>
              <div style={{ fontFamily: fN, fontWeight: 700, fontSize: 13, color: C.textSecundar, lineHeight: 1.25 }}>{eticheta}</div>
            </div>
          );
          return (
            <div>
              <Antet titlu="Caietul meu 📔" inapoi={inapoiAcasa} />

              <div style={{ display: "flex", gap: 10 }}>
                <Statistica emoji="🔥" valoare={streak} eticheta={streak === 1 ? "zi la rând" : "zile la rând"} />
                <Statistica emoji="📅" valoare={zileTotal} eticheta={zileTotal === 1 ? "zi de învățat" : "zile de învățat"} />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <Statistica emoji="💬" valoare={nrDeExersat} eticheta="fraze și cuvinte" />
                <Statistica emoji="📖" valoare={lectiiZilniceFacute} eticheta="lecții zilnice" />
              </div>

              <div style={{ background: C.hartie, borderRadius: 18, padding: "18px 18px", marginTop: 14, boxShadow: "0 2px 8px rgba(15,109,116,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 17, color: C.cerneala }}>Drumul A1 → C2</div>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 15, color: C.verde }}>{totalCitite} / {totalLectii} · {procent}%</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
                  {CURRICULUM.map((niv) => {
                    const totalNiv = niv.lectii.length + (niv.vocabular ? niv.vocabular.length : 0);
                    const citite = niv.lectii.filter((_, i) => lectiiCitite[`${niv.nivel}-${i}`]).length
                      + (niv.vocabular ? niv.vocabular.filter((_, i) => lectiiCitite[`${niv.nivel}-v${i}`]).length : 0);
                    return (
                      <div key={niv.nivel} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 14, color: niv.culoare, width: 30, flexShrink: 0 }}>{niv.nivel}</div>
                        <div style={{ flex: 1, height: 12, background: "#DBEBEC", borderRadius: 6 }}>
                          <div style={{ height: "100%", width: `${totalNiv ? (citite / totalNiv) * 100 : 0}%`, background: niv.culoare, borderRadius: 6, transition: "width .3s" }} />
                        </div>
                        <div style={{ fontFamily: fN, fontWeight: 800, fontSize: 13, color: C.textSecundar, width: 44, textAlign: "right", flexShrink: 0 }}>{citite}/{totalNiv}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {(stiuteBine > 0 || deExersat > 0) && (
                <div style={{ background: C.hartie, borderRadius: 18, padding: "16px 18px", marginTop: 12, boxShadow: "0 2px 8px rgba(15,109,116,0.07)" }}>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 17, color: C.cerneala, marginBottom: 8 }}>Memoria ta</div>
                  <div style={{ fontFamily: fN, fontWeight: 700, fontSize: 15, color: C.textSecundar, lineHeight: 1.5 }}>
                    💪 {stiuteBine} {stiuteBine === 1 ? "frază știută" : "fraze știute"} foarte bine
                    <br />🌱 {deExersat} {deExersat === 1 ? "frază așteaptă" : "fraze așteaptă"} să mai exersezi — le găsești în 🔁 Repetă
                  </div>
                </div>
              )}

              <div style={{ fontFamily: fC, fontSize: 25, color: C.cernealaDeschis, textAlign: "center", marginTop: 20, padding: "0 10px" }}>
                {mesaj}
              </div>
            </div>
          );
        })()}

        {/* ---------- GHID RAPID: MENIU ---------- */}
        {ecran === "ghid" && !ghidSel && (
          <div>
            <Antet titlu="Ghid rapid 📖" inapoi={inapoiAcasa} />
            <div style={{ fontFamily: fN, fontSize: 15, color: C.textSecundar, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>
              Materiale de referință — le deschizi când ai nevoie, ca pe un dicționar de buzunar.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { id: "verbe", emoji: "🔀", titlu: "Verbe neregulate", sub: "54 de verbe cu toate cele 3 forme + căutare" },
                { id: "timpuri", emoji: "🕰️", titlu: "Harta timpurilor", sub: "Toate timpurile pe o pagină: formulă + exemplu" },
                { id: "prepozitii", emoji: "📍", titlu: "Prepozițiile in · on · at", sub: "Regulile simple + capcanele clasice" },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGhidSel(g.id)}
                  style={{ background: C.hartie, border: "none", borderRadius: 18, padding: "18px", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 8px rgba(15,109,116,0.08)", display: "flex", alignItems: "center", gap: 14 }}
                >
                  <div style={{ fontSize: 30, flexShrink: 0 }}>{g.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 19, color: C.cerneala }}>{g.titlu}</div>
                    <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700 }}>{g.sub}</div>
                  </div>
                  <div style={{ fontSize: 22, color: C.textSecundar }}>›</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---------- GHID: VERBE NEREGULATE ---------- */}
        {ecran === "ghid" && ghidSel === "verbe" && (() => {
          const q = cautaVerb.trim().toLowerCase();
          const potriveste = (v) => !q || [v.v1, v.v2, v.v3, v.ro].some((s) => s.toLowerCase().includes(q));
          const aur = VERBE_NEREGULATE.aur.filter(potriveste);
          const restul = VERBE_NEREGULATE.restul.filter(potriveste);
          return (
            <div>
              <Antet titlu="Verbe neregulate 🔀" inapoi={() => { setGhidSel(null); setCautaVerb(""); }} />
              <input
                value={cautaVerb}
                onChange={(e) => setCautaVerb(e.target.value)}
                placeholder="🔎 Caută: go, went, a merge..."
                style={{ width: "100%", boxSizing: "border-box", minHeight: 54, borderRadius: 14, border: "2px solid #D6E7E8", padding: "0 16px", fontFamily: fN, fontWeight: 700, fontSize: 17, color: C.cerneala, background: C.hartie, marginBottom: 14, outline: "none" }}
              />
              <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>
                Cele 3 forme: <b>prezent → trecut → participiu</b> (forma a 3-a, cea din Present Perfect: „I have <i>gone</i>”).
              </div>
              {aur.length > 0 && (
                <>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 15, color: C.textSecundar, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px 4px" }}>⭐ Primele 20 — de aur</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{aur.map((v) => <VerbRand key={v.v1} v={v} />)}</div>
                </>
              )}
              {restul.length > 0 && (
                <>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 15, color: C.textSecundar, textTransform: "uppercase", letterSpacing: 1, margin: "20px 0 10px 4px" }}>Următoarele 34</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{restul.map((v) => <VerbRand key={v.v1} v={v} />)}</div>
                </>
              )}
              {aur.length === 0 && restul.length === 0 && (
                <div style={{ textAlign: "center", fontFamily: fN, fontWeight: 700, fontSize: 17, color: C.textSecundar, paddingTop: 30 }}>
                  Nu am găsit „{cautaVerb}” 🤔<br />Încearcă forma de bază (ex: „go”) sau românește („a merge”).
                </div>
              )}
            </div>
          );
        })()}

        {/* ---------- GHID: HARTA TIMPURILOR ---------- */}
        {ecran === "ghid" && ghidSel === "timpuri" && (
          <div>
            <Antet titlu="Harta timpurilor 🕰️" inapoi={() => setGhidSel(null)} />
            <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>
              Fițuica de aur: formula + când se folosește + un exemplu de reținut.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TIMPURI.map((t, i) => (
                <div key={i} style={{ background: C.hartie, borderRadius: 18, padding: "16px 16px", boxShadow: "0 2px 8px rgba(15,109,116,0.07)" }}>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 18, color: C.cerneala }}>{t.nume}</div>
                  <div style={{ display: "inline-block", fontFamily: fN, fontWeight: 800, fontSize: 14, color: C.coral, background: "#FDECEF", borderRadius: 8, padding: "4px 10px", marginTop: 6 }}>{t.formula}</div>
                  <div style={{ fontFamily: fN, fontSize: 15, color: C.textSecundar, fontWeight: 700, marginTop: 8, lineHeight: 1.4 }}>{t.cand}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, background: "#F2F9F9", borderRadius: 12, padding: "10px 12px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 16, color: C.cerneala }}>{t.ex.en}</div>
                      <div style={{ fontFamily: fC, fontSize: 19, color: C.cernealaDeschis, lineHeight: 1.1 }}>{t.ex.fon}</div>
                      <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700 }}>{t.ex.ro}</div>
                    </div>
                    <button onClick={() => vorbeste(t.ex.en)} style={{ width: 46, height: 46, borderRadius: 12, border: "none", background: C.coral, color: "#fff", fontSize: 18, cursor: "pointer", flexShrink: 0 }} aria-label={`Ascultă: ${t.ex.en}`}>🔊</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------- GHID: PREPOZIȚII ---------- */}
        {ecran === "ghid" && ghidSel === "prepozitii" && (
          <div>
            <Antet titlu="in · on · at 📍" inapoi={() => setGhidSel(null)} />
            <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>
              Regula memorabilă: de la mare la mic — <b>IN</b> (perioade mari) → <b>ON</b> (zile) → <b>AT</b> (ore și puncte exacte).
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {PREPOZITII.map((p) => (
                <div key={p.prep} style={{ background: C.hartie, borderRadius: 18, padding: "16px", boxShadow: "0 2px 8px rgba(15,109,116,0.07)" }}>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 24, color: C.coral }}>{p.prep}</div>
                  <div style={{ fontFamily: fN, fontSize: 15, color: C.textSecundar, fontWeight: 700, marginTop: 4, lineHeight: 1.4 }}>{p.regula}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                    {p.exemple.map((f, i) => <ExempluRand key={i} f={f} culoare={C.coral} />)}
                  </div>
                </div>
              ))}
              <div style={{ background: "#FFF6E5", borderRadius: 14, padding: "14px 16px", fontFamily: fN, fontSize: 15, fontWeight: 700, color: "#7A5A1E", lineHeight: 1.5 }}>
                💡 Capcanele clasice: se spune <b>at night</b> (nu „in the night”), iar când se combină, ziua câștigă: <b>on Monday morning</b>. Și încă una: <b>at the weekend</b> (britanic) sau <b>on the weekend</b> (american) — ambele corecte!
              </div>
            </div>
          </div>
        )}

        {/* ---------- CONTUL MEU ---------- */}
        {ecran === "cont" && (() => {
          const camp = { width: "100%", boxSizing: "border-box", minHeight: 52, borderRadius: 14, border: "2px solid #D6E7E8", padding: "0 16px", fontFamily: fN, fontWeight: 700, fontSize: 16, color: C.cerneala, background: C.hartie, outline: "none" };
          const politica = (
            <button onClick={() => window.open("./privacy.html", "_blank")} style={{ background: "none", border: "none", color: C.cernealaDeschis, fontFamily: fN, fontWeight: 800, fontSize: 14, cursor: "pointer", textDecoration: "underline", marginTop: 16 }}>
              Politica de confidențialitate
            </button>
          );
          if (cloudStare === "indisponibil" || cloudStare === "neconfigurat" || cloudStare === "se-verifica") {
            return (
              <div>
                <Antet titlu="Contul meu ☁️" inapoi={inapoiAcasa} />
                <div style={{ background: C.hartie, borderRadius: 20, padding: "24px 20px", boxShadow: "0 2px 10px rgba(15,109,116,0.08)", textAlign: "center" }}>
                  <div style={{ fontSize: 48 }}>☁️</div>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 20, color: C.cerneala, marginTop: 8 }}>
                    {cloudStare === "neconfigurat" ? "Cloud-ul nu e configurat încă" : "Contul e disponibil în versiunea publicată"}
                  </div>
                  <div style={{ fontFamily: fN, fontSize: 16, color: C.textSecundar, fontWeight: 700, marginTop: 8, lineHeight: 1.5 }}>
                    {cloudStare === "neconfigurat"
                      ? "Urmează pașii „Firebase” din README pentru a activa conturile și sincronizarea."
                      : "Nicio grijă: progresul tău se salvează oricum, aici, pe acest dispozitiv."}
                  </div>
                </div>
              </div>
            );
          }
          if (cont) {
            return (
              <div>
                <Antet titlu="Contul meu ☁️" inapoi={inapoiAcasa} />
                <div style={{ background: C.hartie, borderRadius: 20, padding: "24px 20px", boxShadow: "0 2px 10px rgba(15,109,116,0.08)", textAlign: "center" }}>
                  <div style={{ fontSize: 48 }}>✅</div>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 19, color: C.cerneala, marginTop: 8, wordBreak: "break-all" }}>{cont.username}</div>
                  <div style={{ fontFamily: fN, fontSize: 15, color: C.verde, fontWeight: 800, marginTop: 6 }}>
                    ☁️ Progresul se sincronizează automat pe toate dispozitivele
                  </div>
                </div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  <BtnMare culoare="#E4F0F1" textCuloare={C.cerneala} onClick={() => ruleazaAuth(() => cloud.iesi())}>
                    Deloghează-te (progresul rămâne pe telefon)
                  </BtnMare>
                  {!confirmaStergerea ? (
                    <BtnMare culoare="#FFFFFF" textCuloare={C.rosuBland} stil={{ border: `2px solid ${C.rosuBland}`, boxShadow: "none" }} onClick={() => setConfirmaStergerea(true)}>
                      Șterge contul și datele din cloud
                    </BtnMare>
                  ) : (
                    <div style={{ background: "#FCEDEF", borderRadius: 16, padding: "16px" }}>
                      <div style={{ fontFamily: fN, fontWeight: 800, fontSize: 15, color: C.rosuBland, lineHeight: 1.5, marginBottom: 12 }}>
                        Sigur? Contul și progresul din cloud se șterg definitiv. Progresul de pe acest telefon rămâne.
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <BtnMare culoare={C.rosuBland} stil={{ flex: 1, minHeight: 52 }} onClick={() => ruleazaAuth(async () => { await cloud.stergeContulSiDatele(); setConfirmaStergerea(false); })}>
                          Da, șterge tot
                        </BtnMare>
                        <BtnMare culoare="#FFFFFF" textCuloare={C.cerneala} stil={{ flex: 1, minHeight: 52, boxShadow: "none", border: "2px solid #D6E7E8" }} onClick={() => setConfirmaStergerea(false)}>
                          Renunț
                        </BtnMare>
                      </div>
                    </div>
                  )}
                </div>
                {authMesaj && authMesaj !== "..." && (
                  <div style={{ fontFamily: fN, fontWeight: 800, fontSize: 15, color: C.rosuBland, textAlign: "center", marginTop: 12 }}>{authMesaj}</div>
                )}
                <div style={{ textAlign: "center" }}>{politica}</div>
              </div>
            );
          }
          // Fără cont nu se ajunge aici (poarta de login blochează accesul), dar păstrăm o cale sigură.
          return (
            <div>
              <Antet titlu="Contul meu ☁️" inapoi={inapoiAcasa} />
              <div style={{ fontFamily: fN, fontSize: 15, color: C.textSecundar, fontWeight: 700, lineHeight: 1.5 }}>
                Nu ești conectat. Revino la ecranul de intrare pentru a te loga.
              </div>
              <div style={{ textAlign: "center" }}>{politica}</div>
            </div>
          );
        })()}

        {/* ---------- FRAZE UTILE ---------- */}
        {ecran === "fraze" && (() => {
          const q = normalizeaza(cautaFraza.trim());
          const peStea = (f) => setFavorite((prev) => {
            const n = { ...prev };
            if (n[f.en]) delete n[f.en]; else n[f.en] = true;
            return n;
          });
          const Cautare = (
            <input
              value={cautaFraza}
              onChange={(e) => setCautaFraza(e.target.value)}
              placeholder="🔎 Caută: doctor, cât costă, help..."
              style={{ width: "100%", boxSizing: "border-box", minHeight: 54, borderRadius: 14, border: "2px solid #D6E7E8", padding: "0 16px", fontFamily: fN, fontWeight: 700, fontSize: 17, color: C.cerneala, background: C.hartie, marginBottom: 14, outline: "none" }}
            />
          );

          // CĂUTARE ACTIVĂ: rezultate din toate categoriile
          if (q) {
            const rezultate = Object.entries(FRAZE_UTILE)
              .map(([cat, fraze]) => [cat, fraze.filter((f) => normalizeaza(f.en).includes(q) || normalizeaza(f.ro).includes(q))])
              .filter(([, fraze]) => fraze.length > 0);
            const total = rezultate.reduce((s, [, fr]) => s + fr.length, 0);
            return (
              <div>
                <Antet titlu="Căutare 🔎" inapoi={() => setCautaFraza("")} />
                {Cautare}
                {total === 0 ? (
                  <div style={{ textAlign: "center", fontFamily: fN, fontWeight: 700, fontSize: 17, color: C.textSecundar, paddingTop: 30, lineHeight: 1.5 }}>
                    Nu am găsit „{cautaFraza}” 🤔<br />Încearcă un cuvânt mai simplu, în română sau engleză.
                  </div>
                ) : (
                  rezultate.map(([cat, fraze]) => (
                    <div key={cat}>
                      <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 14, color: C.textSecundar, textTransform: "uppercase", letterSpacing: 1, margin: "16px 0 8px 4px" }}>{cat}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {fraze.map((f) => <FrazaRand key={f.en} f={f} esteStea={!!favorite[f.en]} peStea={peStea} />)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          }

          // ÎN INTERIORUL UNEI CATEGORII
          if (categorie) {
            return (
              <div>
                <Antet titlu={categorie} inapoi={() => setCategorie(null)} />
                {Cautare}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {FRAZE_UTILE[categorie].map((f) => <FrazaRand key={f.en} f={f} esteStea={!!favorite[f.en]} peStea={peStea} />)}
                </div>
              </div>
            );
          }

          // MENIUL: frazele mele + categoriile
          const frazeleMele = Object.entries(FRAZE_UTILE).flatMap(([, fraze]) => fraze).filter((f) => favorite[f.en]);
          return (
            <div>
              <Antet titlu="Fraze utile 💬" inapoi={inapoiAcasa} />
              {Cautare}
              {frazeleMele.length > 0 && (
                <>
                  <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 15, color: C.galbenInchis, textTransform: "uppercase", letterSpacing: 1, margin: "4px 0 10px 4px" }}>
                    ⭐ Frazele mele ({frazeleMele.length})
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {frazeleMele.map((f) => <FrazaRand key={f.en} f={f} esteStea peStea={peStea} />)}
                  </div>
                </>
              )}
              <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 15, color: C.textSecundar, textTransform: "uppercase", letterSpacing: 1, margin: "4px 0 10px 4px" }}>
                Categorii
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {Object.entries(FRAZE_UTILE).map(([cat, fraze]) => (
                  <button
                    key={cat}
                    onClick={() => setCategorie(cat)}
                    style={{ background: C.hartie, border: "none", borderRadius: 16, padding: "16px 18px", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 8px rgba(15,109,116,0.08)", display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 18, color: C.cerneala }}>{cat}</div>
                      <div style={{ fontFamily: fN, fontSize: 14, color: C.textSecundar, fontWeight: 700 }}>{fraze.length} fraze</div>
                    </div>
                    <div style={{ fontSize: 22, color: C.textSecundar }}>›</div>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ---------- PROFESOR: buton flotant + fereastră de chat (pe ORICE ecran) ---------- */}
      {!profDeschis && (
        <button onClick={() => setProfDeschis(true)} aria-label="Profesorul meu"
          style={{ position: "fixed", right: 16, bottom: 16, width: 62, height: 62, borderRadius: "50%", border: "none",
            background: C.cerneala, color: "#fff", fontSize: 28, cursor: "pointer", zIndex: 900,
            boxShadow: "0 6px 20px rgba(15,109,116,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          🧑‍🏫
        </button>
      )}

      {profDeschis && (() => {
        const sugestii = ["Cum spun „mulțumesc frumos”?", "Corectează: I have 40 years", "Ce înseamnă „however”?"];
        const camp = { flex: 1, boxSizing: "border-box", minHeight: 50, borderRadius: 14, border: "2px solid #D6E7E8", padding: "0 14px", fontFamily: fN, fontWeight: 700, fontSize: 16, color: C.cerneala, background: C.hartie, outline: "none" };
        return (
          <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(10,50,53,0.45)", display: "flex" }}>
            <div style={{ background: C.fundal, width: "100%", maxWidth: 520, margin: "0 auto", height: "100%", display: "flex", flexDirection: "column", boxShadow: "0 0 40px rgba(0,0,0,0.25)" }}>
              {/* header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 16px 12px", borderBottom: "1px solid #E1EDED" }}>
                <div style={{ fontFamily: fN, fontWeight: 900, fontSize: 19, color: C.cerneala, flex: 1 }}>Profesorul meu 🧑‍🏫</div>
                <button onClick={() => setProfDeschis(false)} aria-label="Închide"
                  style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: C.hartie, color: C.cerneala, fontSize: 24, fontWeight: 900, cursor: "pointer", boxShadow: "0 2px 6px rgba(15,109,116,0.12)", lineHeight: 1 }}>×</button>
              </div>

              {/* toggle mod */}
              <div style={{ display: "flex", gap: 8, padding: "12px 16px 4px" }}>
                {[["chat", "💬 Discuție"], ["corecteaza", "✍️ Corectează"]].map(([val, et]) => (
                  <button key={val} onClick={() => setProfMod(val)}
                    style={{ flex: 1, minHeight: 42, borderRadius: 12, border: "none", cursor: "pointer", fontFamily: fN, fontWeight: 800, fontSize: 15,
                      background: profMod === val ? C.cerneala : C.hartie, color: profMod === val ? "#fff" : C.textSecundar, boxShadow: "0 2px 6px rgba(15,109,116,0.08)" }}>
                    {et}
                  </button>
                ))}
              </div>

              {/* corp cu mesaje (scroll) */}
              <div ref={profBodyRef} style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                {profMesaje.length === 0 && (
                  <div style={{ background: C.hartie, borderRadius: 18, padding: "18px", boxShadow: "0 2px 10px rgba(15,109,116,0.08)" }}>
                    <div style={{ fontFamily: fN, fontWeight: 800, fontSize: 15.5, color: C.cerneala, lineHeight: 1.5 }}>
                      {profMod === "corecteaza"
                        ? "Scrie o propoziție în engleză și ți-o corectez blând, cu pronunția pe românește. ✍️"
                        : "Întreabă-mă orice despre engleză — îți explic simplu, pe românește. 💬"}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                      {sugestii.map((s) => (
                        <button key={s} onClick={() => trimiteProfesor(s)}
                          style={{ background: "#EEF8F6", border: "none", borderRadius: 20, padding: "9px 14px", fontFamily: fN, fontWeight: 800, fontSize: 13.5, color: C.cerneala, cursor: "pointer" }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {profMesaje.map((m, i) => (
                  <div key={i} style={{ alignSelf: m.rol === "user" ? "flex-end" : "flex-start", maxWidth: "88%",
                    background: m.rol === "user" ? C.cerneala : C.hartie, color: m.rol === "user" ? "#fff" : C.cerneala,
                    borderRadius: 18, borderBottomRightRadius: m.rol === "user" ? 4 : 18, borderBottomLeftRadius: m.rol === "user" ? 18 : 4,
                    padding: "12px 15px", fontFamily: fN, fontWeight: 600, fontSize: 15.5, lineHeight: 1.55, whiteSpace: "pre-wrap",
                    boxShadow: "0 2px 8px rgba(15,109,116,0.08)" }}>
                    {m.text}
                  </div>
                ))}
                {profBusy && (
                  <div style={{ alignSelf: "flex-start", background: C.hartie, borderRadius: 18, padding: "12px 15px", fontFamily: fN, fontWeight: 800, fontSize: 15, color: C.textSecundar, boxShadow: "0 2px 8px rgba(15,109,116,0.08)" }}>
                    Profesorul scrie… ✍️
                  </div>
                )}
              </div>

              {/* bara de input */}
              <div style={{ padding: "10px 16px 14px", borderTop: "1px solid #E1EDED", background: C.fundal }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={profInput} onChange={(e) => setProfInput(e.target.value)}
                    placeholder={profMod === "corecteaza" ? "Scrie propoziția în engleză..." : "Scrie întrebarea ta..."}
                    autoCapitalize="sentences" style={camp}
                    onKeyDown={(e) => { if (e.key === "Enter") trimiteProfesor(); }} />
                  <button onClick={() => trimiteProfesor()} disabled={profBusy || !profInput.trim()}
                    style={{ minWidth: 58, borderRadius: 14, border: "none", cursor: profBusy || !profInput.trim() ? "default" : "pointer",
                      background: profBusy || !profInput.trim() ? "#BFD9DB" : C.cerneala, color: "#fff", fontFamily: fN, fontWeight: 900, fontSize: 20 }}>
                    ➤
                  </button>
                </div>
                <div style={{ fontFamily: fN, fontSize: 12, color: C.textSecundar, fontWeight: 700, textAlign: "center", marginTop: 8 }}>
                  Profesorul e un AI — poate greși uneori. Are nevoie de internet.
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
