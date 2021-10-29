import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

const auth = getAuth();
const authManager = getAuth(app2);

export { authManager, auth };