// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASiFHplgGvS0ujkdDR9F5L9puqxq2JvU0",
  authDomain: "tic-tac-toe-232b4.firebaseapp.com",
  projectId: "tic-tac-toe-232b4",
  storageBucket: "tic-tac-toe-232b4.firebasestorage.app",
  messagingSenderId: "579677566120",
  appId: "1:579677566120:web:a0105a57af5a5515b2fe9d",
  measurementId: "G-9ZWX3PZ412"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);