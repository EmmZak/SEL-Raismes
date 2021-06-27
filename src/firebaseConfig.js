import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNuvkEN2S5iVAnAINVq7ST7g6wnf14zpU",
    authDomain: "sel-raismes.firebaseapp.com",
    projectId: "sel-raismes",
    storageBucket: "sel-raismes.appspot.com",
    messagingSenderId: "880601682775",
    appId: "1:880601682775:web:afb5e15777bdce856ee412",
    measurementId: "G-T85X0MRFMM"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);