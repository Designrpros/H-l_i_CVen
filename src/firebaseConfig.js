// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOYV5JW72ReBu3BwWglYhYElA8IpQIKcA",
  authDomain: "holicven.firebaseapp.com",
  projectId: "holicven",
  storageBucket: "holicven.appspot.com",
  messagingSenderId: "690959316340",
  appId: "1:690959316340:web:a9a822e6e10954d6546821",
  measurementId: "G-ND7ZZY1GLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };