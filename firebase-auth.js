import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhpFPi2o9qbKkPiyTzGY-q5vHDNlx5kDI",
  authDomain: "bdaymark-0000.firebaseapp.com",
  projectId: "bdaymark-0000",
  storageBucket: "bdaymark-0000.firebasestorage.app",
  messagingSenderId: "448823540578",
  appId: "1:448823540578:web:a3c3cb6162de794bb90a3b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

window.daymarkFirebase = {
  signIn: () => signInWithPopup(auth, provider),
  signOut: () => signOut(auth),
  async loadItems(uid, type) {
    const snapshot = await getDocs(collection(db, "users", uid, type));
    return snapshot.docs.map(item => ({ ...item.data(), id: item.data().id ?? item.id }));
  },
  saveItem(uid, type, item) {
    return setDoc(doc(db, "users", uid, type, String(item.id)), item);
  },
  deleteItem(uid, type, id) {
    return deleteDoc(doc(db, "users", uid, type, String(id)));
  }
};

onAuthStateChanged(auth, user => {
  window.dispatchEvent(new CustomEvent("daymark-auth-state", {
    detail: { user: user ? { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL } : null }
  }));
});
