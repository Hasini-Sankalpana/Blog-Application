// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-161e2.firebaseapp.com",
  projectId: "mern-blog-app-161e2",
  storageBucket: "mern-blog-app-161e2.firebasestorage.app",
  messagingSenderId: "111178352470",
  appId: "1:111178352470:web:d242ed372e60b277fa38f7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

