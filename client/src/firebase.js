// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "realstate-mern.firebaseapp.com",
    projectId: "realstate-mern",
    storageBucket: "realstate-mern.appspot.com",
    messagingSenderId: "41956405649",
    appId: "1:41956405649:web:2363fe73c1f5d290576a30",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
