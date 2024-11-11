  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const auth = getAuth(app);
auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();
  const googleLogin =document.getElementById("googlelogin");
  googleLogin.addEventListener("click",function(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    window.location.href="/homepage/patient.html";
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
  })
//   const analytics = getAnalytics(app);