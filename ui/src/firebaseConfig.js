import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  enableIndexedDbPersistence,
  //getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
/*
const firebaseConfigOLD = {
    apiKey: "AIzaSyCNuvkEN2S5iVAnAINVq7ST7g6wnf14zpU",
    authDomain: "sel-raismes.firebaseapp.com",
    projectId: "sel-raismes",
    storageBucket: "sel-raismes.appspot.com",
    messagingSenderId: "880601682775",
    appId: "1:880601682775:web:afb5e15777bdce856ee412",
    measurementId: "G-T85X0MRFMM"
}; */
const firebaseConfig = {
  apiKey: "AIzaSyAlJTkalKBtBVpjsj_DlEmXaXVIv24og0g",
  authDomain: "troc-raismois.firebaseapp.com",
  projectId: "troc-raismois",
  storageBucket: "troc-raismois.appspot.com",
  messagingSenderId: "295238619212",
  appId: "1:295238619212:web:109bcd65e38095bc57e4e9",
  measurementId: "G-12ZPY5CJ6W",
};

const app = initializeApp(firebaseConfig);
const app2 = initializeApp(firebaseConfig, "authManager");
//const db = getFirestore()
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
const auth = getAuth();
const authManager = getAuth(app2);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export { authManager, db, auth };

// Initialize Firebase
//export firebase.initializeApp(firebaseConfig, 'authManager');
//export default firebase.initializeApp(firebaseConfig);
