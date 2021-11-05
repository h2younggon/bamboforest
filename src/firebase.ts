// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-GLoKsiFTuU2vY8vaOFEjEhElskIUVpM",
  authDomain: "bambooforest-19b91.firebaseapp.com",
  projectId: "bambooforest-19b91",
  storageBucket: "bambooforest-19b91.appspot.com",
  messagingSenderId: "349124657688",
  appId: "1:349124657688:web:e825610b28e6d5d14fb96d",
  measurementId: "G-SY924LRCWY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const f = firebase;
export const fb = firebase.firestore;
export const db = firebase.firestore();
