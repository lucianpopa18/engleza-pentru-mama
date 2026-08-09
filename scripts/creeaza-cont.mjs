#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
//  Creează un cont pentru un utilizator (rulează LA TINE, local).
//  Folosește cheia service_role (secretă) — NU ajunge niciodată în app.
//
//  Pregătire (o dată): fă un fișier .env.local în rădăcina proiectului cu:
//     SUPABASE_URL=https://xxxx.supabase.co
//     SUPABASE_SERVICE_ROLE_KEY=eyJ...   (Project Settings → API → service_role)
//
//  Folosire:
//     node scripts/creeaza-cont.mjs <username> <parola>
//     node scripts/creeaza-cont.mjs maria Parola123
//
//  Apoi trimiți utilizatorului: user = maria, parola = Parola123
// ═══════════════════════════════════════════════════════════════
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DOMENIU = "engleza.local";
const radacina = join(dirname(fileURLToPath(import.meta.url)), "..");

// mic parser de .env.local (fără dependențe)
function incarcaEnv() {
  const cai = [join(radacina, ".env.local"), join(radacina, ".env")];
  const env = { ...process.env };
  for (const cale of cai) {
    if (!existsSync(cale)) continue;
    for (const linie of readFileSync(cale, "utf8").split(/\r?\n/)) {
      const m = linie.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

function slug(user) {
  return String(user || "").trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

async function main() {
  const [, , userArg, parola] = process.argv;
  if (!userArg || !parola) {
    console.error("Folosire: node scripts/creeaza-cont.mjs <username> <parola>");
    process.exit(1);
  }
  const username = slug(userArg);
  if (!username) { console.error("Username invalid (folosește litere/cifre)."); process.exit(1); }
  if (parola.length < 6) { console.error("Parola trebuie să aibă minim 6 caractere."); process.exit(1); }

  const env = incarcaEnv();
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Lipsesc SUPABASE_URL sau SUPABASE_SERVICE_ROLE_KEY din .env.local");
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const email = `${username}@${DOMENIU}`;

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: parola,
    email_confirm: true,
    user_metadata: { username },
  });

  if (error) {
    console.error("❌ Eroare:", error.message);
    process.exit(1);
  }

  console.log("✅ Cont creat!");
  console.log("   user   :", username);
  console.log("   parola :", parola);
  console.log("   (id    :", data.user.id + ")");
  console.log("\nTrimite-i utilizatorului: user + parola de mai sus.");
}

main().catch((e) => { console.error(e); process.exit(1); });
