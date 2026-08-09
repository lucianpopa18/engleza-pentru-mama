// Stratul de cont & sincronizare (Supabase). Aceeași interfață ca vechiul firebase.js:
// dacă nu e configurat, esteConfigurat() întoarce false și aplicația arată un mesaj.
// Login pe USERNAME: în spate mapăm username → `<username>@engleza.local`.
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./supabase-config.js";

const DOMENIU = "engleza.local";

const configurat =
  !!supabaseConfig &&
  typeof supabaseConfig.url === "string" &&
  !supabaseConfig.url.startsWith("LIPEȘTE") &&
  typeof supabaseConfig.anonKey === "string" &&
  !supabaseConfig.anonKey.startsWith("LIPEȘTE");

let sb = null;
if (configurat) {
  sb = createClient(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
  });
}

export function esteConfigurat() { return configurat; }
// Clientul brut — necesar pentru a chema funcția AI „profesor" cu tokenul userului.
export function client() { return sb; }

// username → email intern. Curățăm la litere/cifre simple ca să fie predictibil.
export function userLaEmail(user) {
  const u = String(user || "").trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
  return `${u}@${DOMENIU}`;
}

function mapUser(u) {
  const email = u.email || "";
  const username = (u.user_metadata && u.user_metadata.username) || email.replace(`@${DOMENIU}`, "");
  return { uid: u.id, email, username };
}

export function asculta(laSchimbare) {
  if (!configurat) return () => {};
  // emitem starea curentă imediat...
  sb.auth.getSession().then(({ data }) => {
    const u = data && data.session && data.session.user;
    laSchimbare(u ? mapUser(u) : null);
  });
  // ...apoi ascultăm schimbările (login / logout / refresh)
  const { data: sub } = sb.auth.onAuthStateChange((_ev, session) => {
    const u = session && session.user;
    laSchimbare(u ? mapUser(u) : null);
  });
  return () => sub.subscription.unsubscribe();
}

export async function intraEmail(user, parola) {
  const { error } = await sb.auth.signInWithPassword({ email: userLaEmail(user), password: parola });
  if (error) throw error;
}

// Conturile le creează adminul (scripts/creeaza-cont.mjs). Păstrat doar pentru compatibilitate.
export async function creeazaCont() {
  throw new Error("signup-dezactivat");
}

export async function iesi() {
  if (sb) await sb.auth.signOut();
}

export async function incarcaProgres(uid) {
  const { data, error } = await sb.from("progres").select("date").eq("user_id", uid).maybeSingle();
  if (error) return null;
  return (data && data.date) || null;
}

export async function salveazaProgres(uid, date) {
  await sb.from("progres").upsert(
    { user_id: uid, date, updated_at: new Date().toISOString() },
    { onConflict: "user_id" },
  );
}

// Șterge doar datele + delogare. Ștergerea contului auth în sine o face adminul (service_role).
export async function stergeContulSiDatele() {
  const { data } = await sb.auth.getUser();
  const uid = data && data.user && data.user.id;
  if (uid) await sb.from("progres").delete().eq("user_id", uid);
  await sb.auth.signOut();
}
