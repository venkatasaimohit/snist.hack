// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// import { getAnalytics } from "firebase/analytics";

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
const submitButton = document.querySelector(".btn.btn-primary");

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get the input field values
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const specialty = document.getElementById("speciality").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create the user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("creating account...")
            window.location.href="/homepage/doctor.html";

            // Update the user profile with first name, last name, and medical specialty
            updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
                photoURL: specialty
            }).then(() => {
                // Profile updated successfully
                console.log("User profile updated with name and specialty.");
                // You can redirect or perform further actions here
            }).catch((error) => {
                console.error("Error updating profile: ", error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle errors here (show the error to the user)
            console.error("Error signing up: ", errorMessage);
        });
});
