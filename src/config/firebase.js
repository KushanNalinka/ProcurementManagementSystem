import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBhFF9s7ufXi9sTd7XYaP52BaYKbHA7x6M",
  authDomain: "fir-course-ff079.firebaseapp.com",
  projectId: "fir-course-ff079",
  storageBucket: "fir-course-ff079.appspot.com",
  messagingSenderId: "219503602043",
  appId: "1:219503602043:web:ce264794e14a03779ff5de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

