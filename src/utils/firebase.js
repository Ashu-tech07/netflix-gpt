// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netflixgpt-db6a8.firebaseapp.com",
  projectId: "netflixgpt-db6a8",
  storageBucket: "netflixgpt-db6a8.appspot.com",
  messagingSenderId: "425611096758",
  appId: "1:425611096758:web:f6ff672200243dba20ac17",
  measurementId: "G-5CXF0QYJK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth =getAuth();