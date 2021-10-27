import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"
import Feed from "../views/Feed.vue";
import Admin from "../views/Admin.vue";
import Contact from "../views/Contact.vue";
import About from "../views/About.vue";
import UserManager from "../views/UserManager.vue"
//import { isConnected, isAdmin } from "../services/auth"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/users",
    name: "UserManager",
    component: UserManager,
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      authRequired: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    // if guest/visitor
    //let visitor = store.getters.visitor
    //console.log("router visitor", visitor);
    let user = null
    console.log("ROUTER.user", user)
    if (user.id) {
      next();
    } else {
      console.log("You must be logged in to see this page");
      alert("You must be logged in to see this page");
      next({
        path: "/",
      });
    }
  } else {
    next();
  }
});

export default router;
