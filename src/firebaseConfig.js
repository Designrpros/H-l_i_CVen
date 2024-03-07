import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage

const firebaseConfig = {
  apiKey: "AIzaSyAOYV5JW72ReBu3BwWglYhYElA8IpQIKcA",
  authDomain: "holicven.firebaseapp.com",
  projectId: "holicven",
  storageBucket: "holicven.appspot.com",
  messagingSenderId: "690959316340",
  appId: "1:690959316340:web:a9a822e6e10954d6546821",
  measurementId: "G-ND7ZZY1GLW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { db, storage }; // Export storage
