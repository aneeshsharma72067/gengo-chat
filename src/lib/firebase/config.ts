// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvaBLM8nfWkrC9Cjdld-lEqBqYV39IUss",
  authDomain: "gengo-chat.firebaseapp.com",
  projectId: "gengo-chat",
  storageBucket: "gengo-chat.appspot.com",
  messagingSenderId: "1052743113538",
  appId: "1:1052743113538:web:2c8399174ebd8fe46146db",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firestore = getFirestore()