// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTBo99vLV_Od-5DwvTh43A6dyM1tnjAgE",
  authDomain: "netflixgpt-8d9c6.firebaseapp.com",
  projectId: "netflixgpt-8d9c6",
  storageBucket: "netflixgpt-8d9c6.firebasestorage.app",
  messagingSenderId: "928861835408",
  appId: "1:928861835408:web:0735fe4ec08926e4654815",
  measurementId: "G-1J734B58FZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
