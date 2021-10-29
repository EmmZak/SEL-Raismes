import axios from "axios"
import { saveUser, getUserByFirebaseId, deleteUser } from "./user"
import { auth, authManager } from "./../firebaseConfig";

/*
 * Auth
 */



const API_KEY = "AIzaSyAlJTkalKBtBVpjsj_DlEmXaXVIv24og0g"
const FIREBASE_SIGN_UP_API = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
const FIREBASE_SIGN_IN_API = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
const FIREBASE_DELETE_API = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${API_KEY}`
const FIREBASE_UPDATE_MAIL_API = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`
//const FIREBASE_UPDATE_PASSWORD_API = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`

//const API = "http://localhost:5000/users/"

// NOT TO EXPORT
async function firebaseSignUpUser(user) {
    return axios.post(FIREBASE_SIGN_UP_API, {
        email: user.mail,
        password: user.password,
        returnSecureToken: true
    })
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
async function firebaseDeleteUser(user) {
    return axios.post(FIREBASE_DELETE_API, {
        idToken: user.idToken
    })
}

async function firebaseUpdateUserMail(user) {
    return axios.post(FIREBASE_UPDATE_MAIL_API, {
        idToken: user.idToken,
        email: user.mail,
        returnSecureToken: true
    })
}

// EXPORT
async function saveAuthUser(user) {
    let firebaseUser = null
    // let pgUser = {}

    if (user.id) {
        firebaseUser = await firebaseUpdateUserMail(user)
        console.log("create firebaesUser", firebaseUser)
    } else {
        firebaseUser = await firebaseSignUpUser(user)
        console.log("update firebaesUser", firebaseUser)
    }
    console.log("user", user)
    user['firebaseID'] = firebaseUser.data.localId
    user['idToken'] = firebaseUser.data.idToken

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
        await firebaseDeleteUser(user.firebaseID)
        return await deleteUser(user.firebaseID)
    } catch (err) {
        console.log("err", err)
    }
}

async function updateAuthUser(user) {
    console.log("updating", user)
}

function isConnected() {
    let user = auth.currentUser
    console.log("service.isConnected user", user)
    return user
    // set to store
}

async function isAdmin() {
    // set to store
}

export {
    signInAuthUser,
    saveAuthUser,
    deleteAuthUser,
    updateAuthUser,
    isConnected,
    isAdmin
}