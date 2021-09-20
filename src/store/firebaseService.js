import { db, auth, authManager } from "./../../firebaseConfig";
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
  orderBy
} from "@firebase/firestore";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
  deleteUser,
} from "firebase/auth";

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

async function findPublications(sort, category, town) {
  let items = [];
  const q = query(
    collection(db, "publications"),
    where("town.code", "==", town.code),
    orderBy("date", )
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    var pub = doc.data();
    pub.id = doc.id;
    items.push(pub);
  });
  return items;
}

/*
 * Auth
 */
async function logIn(mail, password) {
  await signInWithEmailAndPassword(auth, mail, password);
  let id = auth.currentUser.uid;

  const userDoc = await getDoc(doc(db, "users", id));

  if (userDoc.exists()) {
    return userDoc.data();
  }

  return {};
}

async function createUser(user) {
  await createUserWithEmailAndPassword(auth, user.mail, user.password);
  user.id = auth.currentUser.uid;

  let res = await setDoc(doc(db, "users", user.id), user);

  return res;
}

// only in firestore
async function updateUser(user) {
  await updateDoc(doc(db, "users", user.id), user);
}
// only in authentication
async function updateAuthUser(user, newMail) {
  await signInWithEmailAndPassword(authManager, user.mail, user.password);
  await updateEmail(authManager.currentUser, newMail);
  await signOut(authManager);
}

async function removeUser(user) {
  await signInWithEmailAndPassword(authManager, user.mail, user.password);
  await deleteUser(authManager.currentUser);
  await deleteDoc(doc(db, "users", user.id));
}

async function logOut() {
  await signOut(auth);
}

export {
  findUsers,
  findAll,
  logIn,
  logOut,
  createUser,
  updateUser,
  updateAuthUser,
  removeUser,
};
