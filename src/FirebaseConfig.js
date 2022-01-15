// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD3oyLPqufsKWStWFWpF4PiAqNf8Kk6C1o",
  authDomain: "flash-shop-9e8c9.firebaseapp.com",
  projectId: "flash-shop-9e8c9",
  storageBucket: "flash-shop-9e8c9.appspot.com",
  messagingSenderId: "752387011326",
  appId: "1:752387011326:web:c3a8b35704319af4b7ebaf",
  measurementId: "G-PVV2NFNTM4"
};


const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
export default fireDB;