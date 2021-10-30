import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAlJTkalKBtBVpjsj_DlEmXaXVIv24og0g",
    authDomain: "troc-raismois.firebaseapp.com",
    projectId: "troc-raismois",
    storageBucket: "troc-raismois.appspot.com",
    messagingSenderId: "295238619212",
    appId: "1:295238619212:web:109bcd65e38095bc57e4e9",
    measurementId: "G-12ZPY5CJ6W",
};

//initializeApp(firebaseConfig)
//const auth = getAuth()

// connected client object
function getFirebaseUser() {
    return auth.currentUser
}

async function signInFirebase(mail, password) {
    await signInWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("account.signIn.user", user)
        })
        .catch((err) => {
            console.log("account.signIn.err", err)
        });
}

async function signOutFirebase() {
    await signOut(auth)
        .then(() => {
            console.log("account.signOut OK")
        })
        .catch((err) => {
            console.log("account.signOut.err", err)
        });
}

export {
    getFirebaseUser,
    signInFirebase,
    signOutFirebase
}