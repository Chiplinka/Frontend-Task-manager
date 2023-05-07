// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSnEneYonBMdjvnK6uD8kWtTdIxv8Ap94",
  authDomain: "frontend-task-manager.firebaseapp.com",
  projectId: "frontend-task-manager",
  storageBucket: "frontend-task-manager.appspot.com",
  messagingSenderId: "278291951914",
  appId: "1:278291951914:web:b6a990ae577bba711cee53",
  measurementId: "G-F65QHMX0Y5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);