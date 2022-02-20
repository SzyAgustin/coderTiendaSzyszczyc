// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClY0SNVy2GWLcf1usINj-S2e1_BN30lso",
  authDomain: "szy-ecommerce.firebaseapp.com",
  projectId: "szy-ecommerce",
  storageBucket: "szy-ecommerce.appspot.com",
  messagingSenderId: "286437381058",
  appId: "1:286437381058:web:ec7b2bb8be222765337c5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirebase = () => {
    return app;
}

export const db = getFirestore();
export const authentication = getAuth(app);

export const userSignOut = () => {
  signOut(authentication);
}