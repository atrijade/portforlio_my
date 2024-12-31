const loginText = document.querySelector(".title-text .login");
         const loginForm = document.querySelector("form.login");
         const loginBtn = document.querySelector("label.login");
         const signupBtn = document.querySelector("label.signup");
         const signupLink = document.querySelector("form .signup-link a");
         signupBtn.onclick = (()=>{
           loginForm.style.marginLeft = "-50%";
           loginText.style.marginLeft = "-50%";
         });
         loginBtn.onclick = (()=>{
           loginForm.style.marginLeft = "0%";
           loginText.style.marginLeft = "0%";
         });
         signupLink.onclick = (()=>{
           signupBtn.click();
           return false;
         });
         import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
    import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyB5zqBKjl9Iajj0NQTdED_JYAvlyF3_nzQ",
    authDomain: "myportfolio-2d3a7.firebaseapp.com",
    projectId: "myportfolio-2d3a7",
    storageBucket: "myportfolio-2d3a7.appspot.com",
    messagingSenderId: "888435530072",
    appId: "1:888435530072:web:8780a7ffe9a73003eb2d2d",
    measurementId: "G-99WTCV2RJD"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    console.log(app);

   

    //----- New Registration code start	  
    document.getElementById("register").addEventListener("click", function() {
        var username = document.getElementById('username').value;
        var email =  document.getElementById("email").value;
        var password = document.getElementById("password").value;
        //For new registration
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          alert("Registration successfully!!");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorMessage);
          alert(error);
        });		  		  
    });
    //----- End

    //----- Login code start	  
    document.getElementById("login").addEventListener("click", function() {
        var email =  document.getElementById("login_email").value;
        var password = document.getElementById("login_password").value;

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          alert(user.email+" Login successfully!!!");
        //   document.getElementById('logout').style.display = 'block';
        window.location.href = "index.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          alert(errorMessage);
        });		  
        

    });