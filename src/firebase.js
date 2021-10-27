import  { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBu1mtKvsd0UsgIUpALgVDCQZ0vf5d7prQ",
  authDomain: "clone-49273.firebaseapp.com",
  projectId: "clone-49273",
  storageBucket: "clone-49273.appspot.com",
  messagingSenderId: "517750284620",
  appId: "1:517750284620:web:ee7ba57f9941afca1c2fe9",
  measurementId: "G-J4BPE19GBW",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();


// console.log('database >>>',db);


export { db, auth };
