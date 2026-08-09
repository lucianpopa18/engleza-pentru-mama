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

## ☁️ Conturi + sincronizare (Supabase) — OBLIGATORIU

Aplicația cere **login** pentru a intra (nicio pagină nu e accesibilă fără cont).
Conturile le creezi TU și le trimiți utilizatorilor. Progresul se salvează în cont și
se sincronizează pe orice telefon/tabletă.

**Pasul 1 — Proiectul Supabase (gratuit)**
1. Intră pe [supabase.com](https://supabase.com) → **New project**.
2. Nume `engleza-pentru-mama`, regiune **Europe (Frankfurt)**, alege o parolă de DB (salvează-o).

**Pasul 2 — Baza de date**
1. **SQL Editor** → New query → lipește conținutul din `supabase/schema.sql` → **Run**.
   (Creează tabelul `progres` + regulile RLS: fiecare vede doar datele lui.)

**Pasul 3 — Auth (doar tu faci conturi)**
1. **Authentication → Providers → Email** = activat.
2. **Authentication → Settings** → „Allow new users to sign up" = **OFF** (nimeni nu-și face singur cont).

**Pasul 4 — Cheile aplicației (publice)**
1. **Project Settings → API** → copiază **Project URL** și **anon / publishable key**.
2. Deschide `src/supabase-config.js` și lipește-le peste exemple. Commit → GitHub reconstruiește. ✅

**Pasul 5 — Creezi conturi pentru utilizatori**
1. Fă un fișier `.env.local` în rădăcină cu (din **Project Settings → API**):
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...   ← cheia service_role (SECRETĂ, rămâne doar la tine)
   ```
2. Rulează: `node scripts/creeaza-cont.mjs maria Parola123`
3. Trimite-i utilizatorului: **user = maria**, **parola = Parola123**.

**Pasul 6 — Profesorul AI (opțional, dar recomandat)**
1. Ia o cheie API de pe [ollama.com](https://ollama.com) (Settings → Keys).
2. Instalează Supabase CLI, apoi din proiect:
   ```
   supabase functions deploy profesor
   supabase secrets set OLLAMA_API_KEY=cheia_ta
   ```
   (opțional `OLLAMA_MODEL=gpt-oss:120b-cloud`, `OLLAMA_BASE=https://ollama.com`)

**Pasul 7 — GDPR**
Deschide `public/privacy.html` și completează `[NUMELE TĂU]` și `[EMAILUL TĂU]` la Contact.

> 💡 URL-ul + anon key din `supabase-config.js` sunt **publice prin design** — securitatea
> reală o fac regulile RLS (Pasul 2). Cheia `service_role` NU intră niciodată în aplicație.

---

## 🛠 Pentru dezvoltare locală (opțional)

```bash
npm install     # o singură dată
npm run dev     # pornește aplicația local, cu reîncărcare live
npm run build   # construiește versiunea de producție în /dist
```

## 📂 Structura

```
├── src/App.jsx            ← TOATĂ interfața e aici (lecții, exerciții, profesor, login)
├── src/supabase.js        ← stratul de conturi & sincronizare (nu se atinge)
├── src/supabase-config.js ← URL + anon key ale TALE (vezi secțiunea ☁️)
├── src/main.jsx           ← pornirea React (nu se atinge)
├── supabase/schema.sql    ← baza de date + RLS (rulezi o dată în SQL Editor)
├── supabase/functions/profesor/ ← funcția AI (proxy sigur către Ollama Cloud)
├── scripts/creeaza-cont.mjs ← creezi conturi pentru utilizatori (rulezi local)
├── index.html          ← pagina + setările pentru iPhone (nu se atinge)
├── vite.config.js      ← configurarea PWA: nume, iconițe, offline (rar de atins)
├── public/             ← iconițele aplicației
├── public/privacy.html    ← politica de confidențialitate (completează contactul)
└── .github/workflows/     ← publicarea automată pe GitHub Pages
```
