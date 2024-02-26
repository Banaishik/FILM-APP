// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxAEIopDL7rC0a_cJOlRgdGF0Agwk227k",
  authDomain: "users-weather.firebaseapp.com",
  projectId: "users-weather",
  storageBucket: "users-weather.appspot.com",
  messagingSenderId: "854428049338",
  appId: "1:854428049338:web:abe4fed84a13846b32c783",
  measurementId: "G-5M113RRNXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);