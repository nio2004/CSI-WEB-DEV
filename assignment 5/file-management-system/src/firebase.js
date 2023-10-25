// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsoKv2WwEOkpvfZlhZ4lb5BXR1QTeGRSM",
  authDomain: "csi-assignment-5.firebaseapp.com",
  projectId: "csi-assignment-5",
  storageBucket: "csi-assignment-5.appspot.com",
  messagingSenderId: "961528673226",
  appId: "1:961528673226:web:e7c5d966ee9981650a9533",
  measurementId: "G-WVBW5R4V24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
const analytics = getAnalytics(app);

export const auth = app.auth();