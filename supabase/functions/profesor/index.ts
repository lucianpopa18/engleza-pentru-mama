// ═══════════════════════════════════════════════════════════════
//  Edge Function „profesor" — proxy sigur către Ollama Cloud.
//  • verifică că cel care cheamă e logat (anti-abuz pe cotă)
//  • ține cheia Ollama secretă (nu ajunge niciodată în browser)
//  • dă modelului rol de profesor de engleză pentru un adult român
//
//  Secrete (Supabase → Edge Functions → Secrets):
//     OLLAMA_API_KEY   — cheia din ollama.com
//     OLLAMA_BASE      — opțional, implicit https://ollama.com
//     OLLAMA_MODEL     — opțional, implicit gpt-oss:120b-cloud
//  (SUPABASE_URL și SUPABASE_ANON_KEY sunt injectate automat)
//
//  Deploy:  supabase functions deploy profesor
// ═══════════════════════════════════════════════════════════════
import { createClient } from "jsr:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MODEL = Deno.env.get("OLLAMA_MODEL") || "gpt-oss:120b-cloud";
const BASE = (Deno.env.get("OLLAMA_BASE") || "https://ollama.com").replace(/\/$/, "");
const MAX_MESAJE = 20;
const MAX_LUNGIME = 1000;

const SYSTEM_CHAT = `Ești un profesor de engleză cald și răbdător pentru un ADULT ROMÂN începător.
Reguli:
- Răspunde ÎNTOTDEAUNA în limba română (explicațiile), chiar dacă întrebarea e în engleză.
- Când dai un cuvânt sau o propoziție în engleză, scrie IMEDIAT după ea pronunția „pe românește” în paranteze, în stilul: Can you help me? (chen iu help mi).
- Fii scurt și clar. Fără jargon gramatical inutil. Un singur lucru nou pe rând.
- Scrie text simplu și natural, FĂRĂ formatare markdown: nu folosi asteriscuri (* sau **) pentru îngroșare/italic, nici # pentru titluri. Pune cuvintele englezești între ghilimele normale.
- Încurajează mereu. Accentul românesc NU e o problemă — spune asta la nevoie.
- Dacă ți se cere să corectezi o propoziție: dă varianta corectă, pronunția pe românește, și o explicație scurtă și blândă a greșelii.
- Nu inventa. Dacă nu știi, spune sincer.`;

const SYSTEM_CORECT = SYSTEM_CHAT + `\nModul curent: CORECTARE. Utilizatorul îți trimite o propoziție în engleză (sau română-engleză). Întoarce: 1) varianta corectă în engleză, 2) pronunția pe românește, 3) ce a fost greșit, pe scurt și blând.`;

function raspunde(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return raspunde({ ok: false, error: "Metodă invalidă" }, 405);

  // 1) Autentificare: doar utilizatori logați
  const authHeader = req.headers.get("Authorization") || "";
  const sb = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );
  const { data: userData, error: userErr } = await sb.auth.getUser();
  if (userErr || !userData?.user) {
    return raspunde({ ok: false, error: "Trebuie să fii logat." }, 401);
  }

  // 2) Corpul cererii
  let body: any;
  try { body = await req.json(); } catch { return raspunde({ ok: false, error: "Cerere invalidă" }, 400); }

  const mod = body?.mod === "corecteaza" ? "corecteaza" : "chat";
  const intrare = Array.isArray(body?.mesaje) ? body.mesaje : [];
  const mesaje = intrare
    .filter((m: any) => m && typeof m.text === "string")
    .slice(-MAX_MESAJE)
    .map((m: any) => ({
      role: m.rol === "profesor" ? "assistant" : "user",
      content: String(m.text).slice(0, MAX_LUNGIME),
    }));
  if (mesaje.length === 0) return raspunde({ ok: false, error: "Mesaj gol." }, 400);

  const cheie = Deno.env.get("OLLAMA_API_KEY");
  if (!cheie) return raspunde({ ok: false, error: "AI-ul nu e configurat (lipsește cheia)." }, 503);

  // 3) Apel către Ollama Cloud
  try {
    const r = await fetch(`${BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cheie}` },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        think: false,
        messages: [
          { role: "system", content: mod === "corecteaza" ? SYSTEM_CORECT : SYSTEM_CHAT },
          ...mesaje,
        ],
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      return raspunde({ ok: false, error: "Profesorul nu răspunde acum.", detaliu: t.slice(0, 300) }, 502);
    }
    const j = await r.json();
    const text = (j?.message?.content || "").trim();
    if (!text) return raspunde({ ok: false, error: "Răspuns gol de la profesor." }, 502);
    return raspunde({ ok: true, text, model: MODEL });
  } catch (e) {
    return raspunde({ ok: false, error: "Eroare la conectarea cu profesorul." }, 502);
  }
});
