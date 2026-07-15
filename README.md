# 📔 Caietul de engleză

Aplicație de învățat engleza pentru adulți români — lecții de la A1 la C2, exerciții,
repetiție inteligentă și pronunție scrisă pe românește („chen iu help mi").

Funcționează ca **PWA**: se instalează cu iconiță pe telefon și merge **fără internet**.

---

## 🚀 Publicarea pe GitHub Pages (o singură dată, ~10 minute)

**Pasul 1 — Contul și depozitul (repository)**
1. Intră pe [github.com](https://github.com) și fă-ți cont (gratuit), dacă nu ai.
2. Apasă butonul verde **New** (sau `+` → *New repository*).
3. La *Repository name* scrie: `engleza-pentru-mama` (sau alt nume, nu contează).
4. Lasă **Public** bifat, apasă **Create repository**.

**Pasul 2 — Urcarea fișierelor**
1. Pe pagina noului repository, apasă **uploading an existing file**.
2. Deschide folderul dezarhivat pe calculator, selectează **tot conținutul lui**
   (fișierele și folderele `src`, `public`, `.github` etc.) și trage-le în pagina GitHub.
   > 💡 Trage conținutul folderului, nu folderul în sine — `package.json` trebuie
   > să fie direct în rădăcina repository-ului.
3. Jos, apasă **Commit changes**.

**Pasul 3 — Activarea publicării**
1. În repository: **Settings** → **Pages** (în meniul din stânga).
2. La *Build and deployment* → *Source*, alege **GitHub Actions**.
3. Mergi la fila **Actions** → dacă vezi un mesaj de aprobare, apasă
   *I understand... enable them*, apoi rulează workflow-ul **Publică pe GitHub Pages**
   (butonul *Run workflow*) sau fă orice mic commit ca să pornească singur.
4. Așteaptă ~1-2 minute până bifa devine verde ✅.

**Pasul 4 — Linkul aplicației**
Aplicația ta e live la:
`https://NUMELE-TĂU.github.io/engleza-pentru-mama/`
(îl vezi și în Settings → Pages, sus.)

---

## 📱 Instalarea pe iPhone-ul mamei (2 minute)

1. Deschide linkul de mai sus în **Safari** (important: Safari, nu Chrome).
2. Apasă butonul **Share** (pătratul cu săgeată în sus, jos în mijloc).
3. Derulează și apasă **Add to Home Screen** / **Adaugă pe ecranul principal**.
4. Apasă **Add**. Gata! 🎉

De acum are iconița 📔 „Engleza" pe ecran, aplicația se deschide pe tot ecranul
și **funcționează și fără internet** (după prima deschidere cu internet).
Progresul ei se salvează automat pe telefon.

---

## 🔄 Cum actualizezi aplicația (2 clicuri)

Când primești o versiune nouă a fișierului `App.jsx`:

1. În GitHub, intră în folderul `src` → apasă pe `App.jsx` → iconița **creion** (Edit)
   → șterge tot → lipește conținutul nou → **Commit changes**.
   *(Sau: `src` → **Add file** → **Upload files** → trage noul `App.jsx` peste el.)*
2. Atât. GitHub reconstruiește automat în ~1 minut, iar mama primește versiunea
   nouă la următoarea deschidere a aplicației — **fără să-i piardă progresul**.

---

## ☁️ Activarea conturilor și sincronizării (opțional, ~15 minute)

Aplicația merge perfect și fără acest pas — progresul se salvează pe dispozitiv.
Conturile aduc: sincronizare între dispozitive + fundația pentru monetizare.

**Pasul 1 — Proiectul Firebase (gratuit)**
1. Intră pe [console.firebase.google.com](https://console.firebase.google.com) cu contul tău Google.
2. **Add project** → nume (ex: `caietul-de-engleza`) → poți dezactiva Analytics → **Create**.

**Pasul 2 — Autentificarea**
1. În meniul stâng: **Build → Authentication → Get started**.
2. Activează **Email/Password** (Enable → Save).
3. Activează **Google** (Enable → alege emailul de suport → Save).
4. Fila **Settings → Authorized domains → Add domain** → adaugă:
   `NUMELE-TĂU.github.io`

**Pasul 3 — Baza de date**
1. **Build → Firestore Database → Create database** → *Start in production mode* → alege
   regiunea `europe-west` → **Create**.
2. Fila **Rules** → înlocuiește totul cu regulile de mai jos → **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /utilizatori/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
*(Traducere: fiecare utilizator își poate citi și scrie doar propriile date.)*

**Pasul 4 — Cheile aplicației**
1. **Project settings** (rotița de sus) → secțiunea *Your apps* → iconița **</>** (Web).
2. Dă-i un nume → **Register app** → copiază obiectul `firebaseConfig` afișat.
3. Deschide `src/firebase-config.js` din acest proiect și lipește valorile tale peste
   cele de exemplu. Commit → GitHub reconstruiește → conturile sunt live. ✅

**Pasul 5 — GDPR (obligatoriu când ai utilizatori reali)**
Deschide `public/privacy.html` și completează `[NUMELE TĂU]` și `[EMAILUL TĂU]` la Contact.
Politica e deja legată în aplicație, iar ștergerea contului există în ecranul „Contul meu”.

> 💡 Cheile din `firebase-config.js` sunt **publice prin design** (așa funcționează Firebase
> pe web) — securitatea reală o fac regulile Firestore de la Pasul 3.

---

## 🛠 Pentru dezvoltare locală (opțional)

```bash
npm install     # o singură dată
npm run dev     # pornește aplicația local, cu reîncărcare live
npm run build   # construiește versiunea de producție în /dist
```

## 📂 Structura

```
├── src/App.jsx           ← TOATĂ aplicația e aici (singurul fișier de modificat)
├── src/firebase.js       ← stratul de conturi & sincronizare (nu se atinge)
├── src/firebase-config.js← cheile TALE Firebase (vezi secțiunea ☁️)
├── src/main.jsx          ← pornirea React (nu se atinge)
├── index.html         ← pagina + setările pentru iPhone (nu se atinge)
├── vite.config.js     ← configurarea PWA: nume, iconițe, offline (rar de atins)
├── public/            ← iconițele aplicației
├── public/privacy.html   ← politica de confidențialitate (completează contactul)
└── .github/workflows/    ← publicarea automată pe GitHub Pages
```
