// Stratul de cont & sincronizare (Firebase). Aplicația îl încarcă opțional:
// dacă lipsește sau nu e configurat, totul funcționează local, ca înainte.
import { initializeApp } from "firebase/app";
import {
  getAuth, onAuthStateChanged,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, signInWithRedirect,
  signOut, deleteUser,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";

const configurat =
  !!firebaseConfig &&
  typeof firebaseConfig.apiKey === "string" &&
  !firebaseConfig.apiKey.startsWith("LIPEȘTE");

let auth = null, db = null;
if (configurat) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export function esteConfigurat() { return configurat; }

export function asculta(laSchimbare) {
  if (!configurat) return () => {};
  return onAuthStateChanged(auth, (u) => laSchimbare(u ? { uid: u.uid, email: u.email } : null));
}

export async function intraEmail(email, parola) {
  await signInWithEmailAndPassword(auth, email, parola);
}

export async function creeazaCont(email, parola) {
  await createUserWithEmailAndPassword(auth, email, parola);
}

export async function intraGoogle() {
  const furnizor = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, furnizor);
  } catch (e) {
    // pe iPhone (PWA instalată) fereastra popup poate fi blocată → redirecționăm
    if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) {
      await signInWithRedirect(auth, furnizor);
    } else throw e;
  }
}

export async function iesi() { await signOut(auth); }

export async function stergeContulSiDatele() {
  const u = auth.currentUser;
  if (!u) return;
  await deleteDoc(doc(db, "utilizatori", u.uid)).catch(() => {});
  await deleteUser(u); // poate cere re-autentificare recentă (mesaj tratat în aplicație)
}

export async function incarcaProgres(uid) {
  const s = await getDoc(doc(db, "utilizatori", uid));
  return s.exists() ? s.data() : null;
}

export async function salveazaProgres(uid, date) {
  await setDoc(doc(db, "utilizatori", uid), date);
}
