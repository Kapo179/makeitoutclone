import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBGJ2iWvylm-GGfdfJ-xfCAyN_oZW2hjyg",
    authDomain: "makeitout-fe98b.firebaseapp.com",
    projectId: "makeitout-fe98b",
    storageBucket: "makeitout-fe98b.appspot.com",
    messagingSenderId: "299635082584",
    appId: "1:299635082584:web:34a8260281910e1a19d12d",
    measurementId: "G-RH45Y27WFZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, auth, analytics };