// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWQikqMdTrJawol4_fvgLCnVixltLiIPE",
  authDomain: "reels-clone-d4cf7.firebaseapp.com",
  projectId: "reels-clone-d4cf7",
  storageBucket: "reels-clone-d4cf7.appspot.com",
  messagingSenderId: "751107776455",
  appId: "1:751107776455:web:bad01f3ff8d86c7f3683e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();


export {auth, storage, db }
export default app;
