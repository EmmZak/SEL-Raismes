import { db, auth, authManager } from "./../firebaseConfig";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "@firebase/firestore";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  //updateProfile,
  updateEmail,
  deleteUser,
} from "firebase/auth";

/*
 * Auth
 */
function isConnected() {
  let user = auth.currentUser
  console.log("service.isConnected user", user)
  return user
}
async function logIn(mail, password) {
  await signInWithEmailAndPassword(auth, mail, password);
  let id = auth.currentUser.uid;

  const userDoc = await getDoc(doc(db, "users", id));

  if (userDoc.exists()) {
    return userDoc.data();
  }

  return {};
}

// only in firestore

// only in authentication
async function updateAuthUser(user, newMail) {
  await signInWithEmailAndPassword(authManager, user.mail, user.password);
  await updateEmail(authManager.currentUser, newMail);
  await signOut(authManager);
}

async function logOut() {
  await signOut(auth);
}

/*
 * Event CRUD
 */
async function findEvents() {
  let items = [];
  const q = query(collection(db, "events"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    var pub = doc.data();
    pub.id = doc.id;
    items.push(pub);
  });
  return items;
}
async function createEvent(e) {
  await addDoc(doc(db, "events"), e);
}
async function updateEvent(e) {
  await updateDoc(doc(db, "events", e.id), e);
}
async function removeEvent(e) {
  await deleteDoc(doc(db, "events", e.id));
}

/*
 * Admin CRUD
 */
async function findAdmin(id) {
  let userDoc = await getDoc(doc(db, "users", id))
  return userDoc.exists() ? userDoc.data(): {}
}
async function findAdmins() {
  let items = [];
  const q = query(collection(db, "users"), where("admin", "==", true));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    var pub = doc.data();
    pub.id = doc.id;
    items.push(pub);
  });
  return items;
}
async function createAdmin(user) {
  await createUserWithEmailAndPassword(authManager, user.mail, user.password);
  user.id = authManager.currentUser.uid;
  await setDoc(doc(db, "users", user.id), user);
  return user.id;
}
async function updateAdmin(user, newMail) {
  if (user.mail != newMail) {
    // update auth object's mail
    await signInWithEmailAndPassword(authManager, user.mail, user.password);
    await updateEmail(authManager.currentUser, newMail);
  }
  // anything else is in firestore collection-doc
  await updateDoc(doc(db, "users", user.id), user);
}
async function removeAdmin(user) {
  await signInWithEmailAndPassword(authManager, user.mail, user.password);
  await deleteUser(authManager.currentUser);
  await deleteDoc(doc(db, "users", user.id));
}
/*
 * User CRUD
 */
async function findUser(id) {
  let userDoc = await getDoc(doc(db, "users", id))
  return userDoc.exists() ? userDoc.data(): {}
}
async function findUsers() {
  let items = [];
  const q = query(collection(db, "users"), where("admin", "==", false));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    var pub = doc.data();
    pub.id = doc.id;
    items.push(pub);
  });
  return items;
}
async function createUser(user) {
  ////console.log("service.createUser")
  let res = await createUserWithEmailAndPassword(authManager, user.mail, user.password);
  ////console.log("got res", res)
  ////console.log("currentUser", auth.currentUser)
  user.id = authManager.currentUser.uid;
  let userDoc = await setDoc(doc(db, "users", user.id), user);
  ////console.log("set doc", userDoc)
  return user.id;
}
async function updateUser(user, backup) {
  ////console.log("update user", user, "new mail", user.mail)
  if (user.mail != backup.mail) {
    ////console.log("UPDATE MAIL")
    // update auth object's mail
    await signInWithEmailAndPassword(authManager, backup.mail, backup.password);
    await updateEmail(authManager.currentUser, user.mail);
  }
  // anything else is in firestore collection-doc
  await updateDoc(doc(db, "users", user.id), user);
}
async function removeUser(user) {
  await signInWithEmailAndPassword(authManager, user.mail, user.password);
  await deleteUser(authManager.currentUser);
  await deleteDoc(doc(db, "users", user.id));
}

/*
 * Publication CRUD
 */
// sort asc|desc, category array
async function findPublications(sort, categs) {
  let items = [];

  let q = null
  ////console.log("creating query sort categs", sort, categs)
  if (sort==undefined && categs==undefined) {
    q = query(
      collection(db, "publications"),
      //where("town", "in", towns),
      //where("categ", "in", categs),
      //orderBy("createdOn", sort)
      //limit(10)
    );
  } else {
    q = query(
      collection(db, "publications"),
      //where("town", "in", towns),
      where("categ", "in", categs),
      orderBy("createdOn", sort)
      //limit(10)
    );
  }

  let querySnapshot =null
  //console.log("query created")
  try {
    querySnapshot = await getDocs(q);
  } catch(err) {
    //console.log("err", err)
  }
  
  //console.log("got docs ")
  querySnapshot.forEach((doc) => {
    var pub = doc.data();
    pub.id = doc.id;
    items.push(pub);
  });
  //console.log("retuning items")
  return items;
}
async function findPublication(id) {
  let itemDoc = await getDoc(doc(db, "publications", id))
  return itemDoc.exists() ? itemDoc.data(): {}
}
async function createPublication(item) {
  await addDoc(collection(db, "publications"), item);
}
async function updatePublication(item) {
  await updateDoc(doc(db, "publications", item.id), item);
}
async function removePublication(item) {
  await deleteDoc(doc(db, "publications", item.id));
}

export {
  // objects
  db,
  auth,
  authManager,
  // CRUD export
  // event
  findEvents,
  createEvent,
  updateEvent,
  removeEvent,
  // user
  findUser,
  findUsers,
  createUser,
  updateUser,
  removeUser,
  // admin
  findAdmin,
  findAdmins,
  createAdmin,
  updateAdmin,
  removeAdmin,
  // publication
  findPublication,
  findPublications,
  createPublication,
  updatePublication,
  removePublication,
  // auth
  isConnected,
  logIn,
  logOut,
  updateAuthUser,
};
