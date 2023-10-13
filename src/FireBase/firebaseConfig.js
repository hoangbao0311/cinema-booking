import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi9fMIbJpqPzISNjagnrBNtUWhzqLbvWo",
  authDomain: "cinema-booking-989b3.firebaseapp.com",
  projectId: "cinema-booking-989b3",
  storageBucket: "cinema-booking-989b3.appspot.com",
  messagingSenderId: "104881535539",
  appId: "1:104881535539:web:ea0848f65a964ce673c146",
  measurementId: "G-HYC3K7KW2X",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
