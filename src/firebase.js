// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjvyI4sUgjznfQcW9WsIGLdiKVkHnu3IA",
  authDomain: "todo-789a1.firebaseapp.com",
  projectId: "todo-789a1",
  storageBucket: "todo-789a1.appspot.com",
  messagingSenderId: "44493131590",
  appId: "1:44493131590:web:abc215725ff6ef39ef5f47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
