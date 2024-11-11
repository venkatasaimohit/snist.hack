// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2_5gzNjNdj88SAmc2psHsYVNTMEr6WFA",
  authDomain: "hack-fe8c7.firebaseapp.com",
  projectId: "hack-fe8c7",
  storageBucket: "hack-fe8c7.firebasestorage.app",
  messagingSenderId: "58824388156",
  appId: "1:58824388156:web:56d809896a20091a319d39",
  measurementId: "G-C0W5L2EX64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth();

// Grab the form and submit button
const submitButton = document.querySelector(".login-btn");

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get the input field values for email and password only
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create the user with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("login successfully!");

            // Redirect to the doctor homepage after successful signup
            window.location.href = "/homepage/patient.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle errors here (show the error to the user)
            console.error("Error signing up: ", errorMessage);
            alert(errorMessage);
        });
});
