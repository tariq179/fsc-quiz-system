// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7WtRO6Wp_-K8qqtDJ6Wobh1iDhXEa6Gs",
  authDomain: "quizapp-96dd3.firebaseapp.com",
  projectId: "quizapp-96dd3",
  storageBucket: "quizapp-96dd3.firebasestorage.app",
  messagingSenderId: "693338762606",
  appId: "1:693338762606:web:aee03b82315cd809be257f",
  measurementId: "G-XEST8YLRXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);