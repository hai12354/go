import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6XLTII84meghTkai6fYQuaQfY208CYiI",
  authDomain: "webb-4d353.firebaseapp.com",
  projectId: "webb-4d353",
  storageBucket: "webb-4d353.firebasestorage.app",
  messagingSenderId: "10587912792",
  appId: "1:10587912792:web:71b9403998297b1238682d",
  measurementId: "G-P6EV4R75NK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);