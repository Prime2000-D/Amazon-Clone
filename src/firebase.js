import  { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  PUT_YOUR_FIREBASE_CONFIG
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();


// console.log('database >>>',db);


export { db, auth };
