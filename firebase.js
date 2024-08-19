// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCy1O4m5kkOcunRvHB4prNgm8OKF9_lF-Q",
    authDomain: "ai-flashcards-80790.firebaseapp.com",
    projectId: "ai-flashcards-80790",
    storageBucket: "ai-flashcards-80790.appspot.com",
    messagingSenderId: "793514586756",
    appId: "1:793514586756:web:6c8571733a61adbcb748d1",
    measurementId: "G-D11E33L98C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }