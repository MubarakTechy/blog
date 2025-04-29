import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBoU27dzuzesd6i24fhziZYJf99rYvT5g",
  authDomain: "blogproject-b6ba1.firebaseapp.com",
  projectId: "blogproject-b6ba1",
  storageBucket: "blogproject-b6ba1.firebasestorage.app",
  messagingSenderId: "581208211246",
  appId: "1:581208211246:web:148b548ae98ee245c6c4bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export   const provider = new GoogleAuthProvider();