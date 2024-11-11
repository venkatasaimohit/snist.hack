// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

// Grab the form and submit button using the correct selector
const submitButton = document.querySelector(".signup-btn"); // Corrected to use the ID with #

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get the input field values
    const fullname = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create the user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Update the profile with full name
            updateProfile(user, {
                displayName: fullname
            })
            .then(() => {
                alert("Account created successfully!");

                // Redirect to another page after successful signup
                window.location.href = "/homepage/patient.html"; // Change the path as per your structure
            })
            .catch((error) => {
                console.error("Error updating profile:", error.message);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle errors here (show the error to the user)
            console.error("Error signing up: ", errorMessage);
            alert(errorMessage);
        });
});
