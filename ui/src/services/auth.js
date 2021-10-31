import axios from "axios"
import { saveUser, getUserByFirebaseId, deleteUser } from "./user"

import {
    createUserWithEmailAndPassword,
    authManager,
    signInWithEmailAndPassword,
    signOut
} from "./../firebaseConfig"


/*
 * Auth
 */
const API_KEY = "AIzaSyAlJTkalKBtBVpjsj_DlEmXaXVIv24og0g"
const FIREBASE_SIGN_IN_API = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

//const API = "http://localhost:5000/users/"

// NOT TO EXPORT
async function firebaseSignUpUser(user) {
    return createUserWithEmailAndPassword(authManager, user.mail, user.password)
}
// NOT TO EXPORT
async function firebaseSignInUser(user) {
    return axios.post(FIREBASE_SIGN_IN_API, {
        email: user.mail,
        password: user.password,
        returnSecureToken: true
    })
}
// NOT TO EXPORT
// async function firebaseDeleteUser(user) {
//     return axios.post(FIREBASE_DELETE_API, {
//         idToken: user.idToken
//     })
// }

// EXPORT
async function saveAuthUser(user, userOld) {
    let firebaseUser = null
    // let pgUser = {}

    if (user.id) {
        console.log("UPDATING USER ...")
        if (user.mail != userOld.mail) {
            console.log("auth.saveAuthUser.signIn.userOld.mail", userOld.mail, user.password)
            await signInWithEmailAndPassword(authManager, userOld.mail, user.password)
                .then((res) => {
                    console.log("saveAuthUser.signIn.res", res)
                })
                .catch((err) => {
                    console.log("saveAuthUser.signIn.err", err)
                    throw err
                })

            // await updateEmail(authManager.currentUser, user.mail)
            //     .then((res) => {
            //         console.log("saveAuthUser.updateMail.res", res)
            //     })
            //     .catch((err) => {
            //         console.log("saveAuthUser.updateMail.err", err)
            //         throw err
            //     })
        }
    } else {
        console.log("CREATING USER ...")
        await firebaseSignUpUser(user)
            .then((userCreds) => {
                firebaseUser = userCreds.user
                console.log("auth.firebaseSignUp.firebaseUser", firebaseUser)
                user['firebaseID'] = firebaseUser.uid
            })
            .catch((err) => {
                console.log("auth.firebaseSignUp.err", err)
                throw err
            })
        console.log("created ... signing Out")
        await signOut(authManager)
    }

    return await saveUser(user)
}

async function signInAuthUser(user) {
    let firebaseUser = null

    firebaseUser = await firebaseSignInUser(user)
    let firebaseID = firebaseUser.uid

    return await getUserByFirebaseId(firebaseID)
}

async function deleteAuthUser(user) {
    try {
        //await firebaseDeleteUser(user.firebaseID)
        return await deleteUser(user.firebaseID)
    } catch (err) {
        console.log("err", err)
    }
}

async function updateAuthUser(user) {
    console.log("updating", user)
}

// function isConnected() {
//     let user = auth.currentUser
//     console.log("service.isConnected user", user)
//     return user
//     // set to store
// }

async function isAdmin() {
    // set to store
}

function getCurrentAuthManagerUser() {
    return authManager.currentUser
}

export {
    //auth,
    signInAuthUser,
    saveAuthUser,
    deleteAuthUser,
    updateAuthUser,
    isAdmin,
    getCurrentAuthManagerUser
}