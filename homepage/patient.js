import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
        import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const firebaseConfig={
    apiKey: "AIzaSyA2_5gzNjNdj88SAmc2psHsYVNTMEr6WFA",
    authDomain: "hack-fe8c7.firebaseapp.com",
    databaseURL: "https://hack-fe8c7-default-rtdb.firebaseio.com",
    projectId: "hack-fe8c7",
    storageBucket: "hack-fe8c7.firebasestorage.app",
    messagingSenderId: "58824388156",
    appId: "1:58824388156:web:526929d965b4c5eb319d39",
    measurementId: "G-5MWQZ8Z8FP"
}
initializeApp(firebaseConfig);
const db= getFirestore();
const colRef=collection(db,'patient')
getDocs(colRef)
    .then((snapshot) => {
        let prescriptions = [];
        snapshot.docs.forEach((doc) => {
            prescriptions.push({ ...doc.data(), id: doc.id });
        });
        document.getElementById('patientContainer').innerHTML = createPrescriptionTable(prescriptions);
    })
    .catch((err) => {
        console.log(err.message);
        document.getElementById('patientContainer').innerHTML = `<div class="error">Error loading prescriptions: ${err.message}</div>`;
    });
