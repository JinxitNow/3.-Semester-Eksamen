// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Importer Firebase
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQbtEVEz_2F3emfO7b9YkG1gssh5P9R1c",
  authDomain: "sem-eksamen-adb47.firebaseapp.com",
    databaseURL: "https://sem-eksamen-adb47-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "sem-eksamen-adb47",
  storageBucket: "sem-eksamen-adb47.firebasestorage.app",
  messagingSenderId: "60747001285",
  appId: "1:60747001285:web:c740dcbcff4cc878fc2fac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };