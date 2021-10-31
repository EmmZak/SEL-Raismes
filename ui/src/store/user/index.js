import { getUserByFirebaseId } from "./../../services/user"
import {
    auth,
    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence
} from "../../firebaseConfig"

export default {
    state: {
        authUser: null, // firebase auth object
        user: null, // user object
        isAdmin: false, // boolean
        isConnected: false
    },
    mutations: {
        setAuthUser(state, authUser) {
            state.authUser = authUser
        },
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        async setup({ commit }, authUser) {
            commit('setAuthUser', authUser)
            let user = null
            if (authUser) {
                user = await getUserByFirebaseId(authUser.uid)
                console.log("user", user.data)
            }
            commit('setUser', user.data)
        },
        async signIn({ commit, getters }, paylod) {
            console.log("BEFORE SignIN")
            await setPersistence(auth, browserLocalPersistence)
                .then(async () => {
                    await signInWithEmailAndPassword(auth, paylod.mail, paylod.password)
                        .then(async (userCredential) => {
                            const authUser = userCredential.user;
                            console.log("state.signIn.authUser", authUser)
                            commit('setAuthUser', authUser)

                            console.log("getters.authUser ", getters.authUser)
                            let user = await getUserByFirebaseId(getters.authUser.uid)
                            commit('setUser', user.data)
                        })
                        .catch((err) => {
                            console.log("state.signIn.err", err)
                            throw err
                        });
                })
                .catch((err) => {
                    throw err
                })
        },
        async signOutStore({ commit }) {
            console.log("Store.signOut")
            await signOut(auth)
                .then(() => {
                    commit('setAuthUser', null)
                    commit('setUser', null)
                })
                .catch((err) => {
                    console.log("state.signOut.err", err)
                })
        }
    },
    getters: {
        authUser(state) {
            return state.authUser
        },
        user(state) {
            return state.user
        },
        isAdmin(state) {
            return state.isAdmin
        }
    }
}