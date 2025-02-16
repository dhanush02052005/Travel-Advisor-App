// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRAaCAbfHSZmVrub6g8FR4v2JR_PpGiAw",
  authDomain: "travel-advisor-9acb2.firebaseapp.com",
  projectId: "travel-advisor-9acb2",
  storageBucket: "travel-advisor-9acb2.firebasestorage.app",
  messagingSenderId: "520585364002",
  appId: "1:520585364002:web:6ac7e7f1e815e73940807b",
  measurementId: "G-X1VNR4840R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);