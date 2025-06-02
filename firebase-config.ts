import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHO9EYPBBoXSSFb8-eS5x4HRZbu3ejbxk",
  authDomain: "rivalswaitlist.firebaseapp.com",
  databaseURL: "https://rivalswaitlist-default-rtdb.firebaseio.com",
  projectId: "rivalswaitlist",
  storageBucket: "rivalswaitlist.firebasestorage.app",
  messagingSenderId: "672172094502",
  appId: "1:672172094502:web:0640f45bc34ae81371a2e7",
  measurementId: "G-7JK2B24VPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 