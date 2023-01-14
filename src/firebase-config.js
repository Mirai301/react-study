// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, TwitterAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm0csPad6cEnKsU4vY89EHIdBvg9k_cj0",
  authDomain: "fir-blog-af42b.firebaseapp.com",
  projectId: "fir-blog-af42b",
  storageBucket: "fir-blog-af42b.appspot.com",
  messagingSenderId: "685531143665",
  appId: "1:685531143665:web:d7d922fb962f6764f7b850"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new TwitterAuthProvider();