// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyAiSSNeuMFq4swAhcbCfnCVeXNMJiKwrR8",
   authDomain: "newnetflixgpt-9cf0d.firebaseapp.com",
   projectId: "newnetflixgpt-9cf0d",
   storageBucket: "newnetflixgpt-9cf0d.firebasestorage.app",
   messagingSenderId: "532811392838",
   appId: "1:532811392838:web:05344b1c550787b7d3a747",
   measurementId: "G-Z0NL4XR1S7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);