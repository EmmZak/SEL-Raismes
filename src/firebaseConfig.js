import firebase from "firebase/app";
//import "firebase/auth";
//import "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfigOLD = {
    apiKey: "AIzaSyCNuvkEN2S5iVAnAINVq7ST7g6wnf14zpU",
    authDomain: "sel-raismes.firebaseapp.com",
    projectId: "sel-raismes",
    storageBucket: "sel-raismes.appspot.com",
    messagingSenderId: "880601682775",
    appId: "1:880601682775:web:afb5e15777bdce856ee412",
    measurementId: "G-T85X0MRFMM"
};

const firebaseConfig = {
    apiKey: "AIzaSyAlJTkalKBtBVpjsj_DlEmXaXVIv24og0g",
    authDomain: "troc-raismois.firebaseapp.com",
    projectId: "troc-raismois",
    storageBucket: "troc-raismois.appspot.com",
    messagingSenderId: "295238619212",
    appId: "1:295238619212:web:109bcd65e38095bc57e4e9",
    measurementId: "G-12ZPY5CJ6W"
  };

const FirebaseRef = firebase.initializeApp(firebaseConfig);
const Firestore = FirebaseRef.firestore();
const FirebaseAuth = FirebaseRef.auth();
const FirebaseRefForAuth = firebase.initializeApp(firebaseConfig, 'authManager').auth(); 

export {
    firebaseConfig,
    FirebaseRefForAuth,
    Firestore,
    FirebaseAuth
};

// Initialize Firebase
//export firebase.initializeApp(firebaseConfig, 'authManager');   
//export default firebase.initializeApp(firebaseConfig);    