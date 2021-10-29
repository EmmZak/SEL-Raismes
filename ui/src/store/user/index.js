export default {
    state: {
        authUser: null, // firebase auth object
        user: null, // user object
        isAdmin: false // boolean
    },
    getters: {
        user(state) {
            return state.user
        },
        isAdmin(state) {
            return state.isAdmin
        }
    }
}