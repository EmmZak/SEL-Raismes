import { getUserByFirebaseId } from "./../../services/user"
import { auth, signInWithEmailAndPassword, signOut } from "../../firebaseConfig"

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
        async setup({ commit }) {
            const authUser = auth.currentUser
            console.log("authUser", authUser)
            commit('setAuthUser', authUser)
            let user = null
            if (authUser) {
                user = await getUserByFirebaseId(authUser.uid)
                console.log("user", user)
            }
            commit('setUser', user)
            console.log("state.setup done")
        },
        async signIn({ commit, getters }, paylod) {
            await signInWithEmailAndPassword(auth, paylod.mail, paylod.password)
                .then((userCredential) => {
                    const authUser = userCredential.user;
                    console.log("state.signIn.authUser", authUser)
                    commit('setAuthUser', authUser)
                })
                .catch((err) => {
                    console.log("state.signIn.err", err)
                });
            let user = {}
            if (getters.authUser) {
                console.log("getters.authUser ", getters.authUser)
                user = await getUserByFirebaseId(getters.authUser.uid)
                commit('setUser', user.data)
            }
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