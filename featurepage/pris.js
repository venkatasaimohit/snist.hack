// Import necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2_5gzNjNdj88SAmc2psHsYVNTMEr6WFA",
    authDomain: "hack-fe8c7.firebaseapp.com",
    databaseURL: "https://hack-fe8c7-default-rtdb.firebaseio.com",
    projectId: "hack-fe8c7",
    storageBucket: "hack-fe8c7.firebasestorage.app",
    messagingSenderId: "58824388156",
    appId: "1:58824388156:web:526929d965b4c5eb319d39",
    measurementId: "G-5MWQZ8Z8FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbRealtime = getDatabase(app); // Reference to Realtime Database
const dbFirestore = getFirestore(app); // Reference to Firestore

// Function to handle saving prescription data to Firestore
async function savePrescription() {
    // Get values from the form
    const patientName = document.getElementById("patientName").value;
    const patientEmail = document.getElementById("patientEmail").value;
    const prescriptionDate = document.getElementById("prescriptionDate").value;
    const diagnosis = document.getElementById("diagnosis").value;
    const specialization = document.getElementById("specialization").value;
    const additionalNotes = document.getElementById("additionalNotes").value;
    
    // Get medications
    const medications = [];
    const medicationList = document.getElementById("medicationList").children;
    for (let medication of medicationList) {
        const medicationName = medication.querySelector(".medication-name").textContent;
        medications.push(medicationName);
    }

    // Get tests (if any)
    const tests = [];
    const testList = document.getElementById("testList").children;
    for (let test of testList) {
        const testName = test.querySelector(".test-name").textContent;
        tests.push(testName);
    }

    // Prepare data object for Firestore
    const prescriptionData = {
        patientName,
        patientEmail,
        prescriptionDate,
        diagnosis,
        specialization,
        additionalNotes,
        medications,
        tests,
        timestamp: serverTimestamp()  // Firestore server timestamp
    };

    // Save data to Firestore
    try {
        await addDoc(collection(dbFirestore, "prescriptions"), prescriptionData);
        alert("Prescription saved successfully!");
        document.getElementById("MediJournal").reset(); // Reset the form after submission
    } catch (error) {
        console.error("Error saving prescription: ", error);
        alert("Error saving prescription!");
    }
}

// Event listener for the Save & Send button
document.querySelector(".save-btn").addEventListener("click", savePrescription);

// Function to submit form data to Realtime Database
function submitForm(e) {
    e.preventDefault();

    // Capture form field values
    const patientEmail = document.getElementById("patientEmail").value;
    const prescriptionDate = document.getElementById("prescriptionDate").value;
    const diagnosis = document.getElementById("diagnosis").value;

    console.log(patientEmail, prescriptionDate, diagnosis);

    // Write data to Firebase Realtime Database
    const patientRef = ref(dbRealtime, 'prescriptions');  // Reference to the 'prescriptions' node
    push(patientRef, {
        patientEmail,
        date: prescriptionDate,
        diagnosis
    })
    .then(() => {
        console.log("Data saved successfully.");
    })
    .catch((error) => {
        console.error("Error saving data:", error);
    });
}

// Event listener for form submission (for Realtime Database usage)
document.getElementById('MediJournal').addEventListener("submit", submitForm);

// Function to populate form fields with user data from Firebase Authentication
function populateUserDetails(user) {
    const patientNameField = document.getElementById("patientName");
    const patientEmailField = document.getElementById("patientEmail");

    if (user) {
        // If the user is logged in, populate the fields
        patientNameField.value = user.displayName || "Not provided";
        patientEmailField.value = user.email;

        // Ensure fields are editable
        patientNameField.removeAttribute("readonly");
        patientEmailField.removeAttribute("readonly");
    } else {
        // If no user is logged in, clear fields and make them readonly
        patientNameField.value = "";
        patientEmailField.value = "";

        patientNameField.setAttribute("readonly", true);
        patientEmailField.setAttribute("readonly", true);
    }
}

// Check if user is authenticated on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        populateUserDetails(user);
    } else {
        console.log("No user is signed in.");
    }
});
