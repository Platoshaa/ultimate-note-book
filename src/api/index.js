import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwtu3pgMjobGKMl7bz1fwpOwnLPQvF5CI",
  authDomain: "ultimate-note-book.firebaseapp.com",
  projectId: "ultimate-note-book",
  storageBucket: "ultimate-note-book.appspot.com",
  messagingSenderId: "565704561461",
  appId: "1:565704561461:web:aad8419bdbc1149cf0727c",
  measurementId: "G-N0MD8TW6YH",
};
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
export const au = getAuth(app);

const db = getFirestore(app);
export const dataAPI = {
  async getBookMarks(userToken, parentId = null) {
    const q = query(
      collection(db, "users", userToken, "bookmarks"),
      where("parent", "==", parentId)
    );
    const querySnapshot = await getDocs(q);
    const res = [];
    querySnapshot.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });
    return res;
  },
  async getArticles(userToken, bookmark) {
    const q = query(
      collection(db, "users", userToken, "articles"),
      where("bookmarkId", "==", bookmark)
    );
    const querySnapshot = await getDocs(q);
    const res = [];
    querySnapshot.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });
    return res;
  },
  async addBookMark(token, name, parentId = null) {
    await addDoc(collection(db, "users", token, "bookmarks"), {
      name: name,
      content: [],
      children: [],
      parent: parentId,
    });
    return dataAPI.getBookMarks(token, parentId);
  },
  async updateArticleName(token, id, name) {
    await updateDoc(doc(db, "users", token, "articles", id), {
      name,
    });
    const res = await dataAPI.getArticle(token, id);
    return res.name;
  },
  async updateArticleContent(token, id, content) {
    await updateDoc(doc(db, "users", token, "articles", id), {
      content,
    });
    return await dataAPI.getArticle(token, id).content;
  },
  async addArticle(token, bookmarkId) {
    const art = await addDoc(collection(db, "users", token, "articles"), {
      name: "Заголовок",
      body: "",
      bookmarkId,
    });
    return art.id;
  },
  async getArticle(token, id) {
    const art = await getDoc(doc(db, "users", token, "articles", id));

    return art.data();
  },
  async addBookMark(token, name, parentId = null) {
    await addDoc(collection(db, "users", token, "bookmarks"), {
      name: name,
      content: [],
      children: [],
      parent: parentId,
    });
    return dataAPI.getBookMarks(token, parentId);
  },
  async deleteBookMark(token, id, parentId = null) {
    await deleteDoc(doc(db, "users", token, "bookmarks", id));
    return dataAPI.getBookMarks(token, parentId);
  },
};

export const authAPI = {
  async signIn() {
    const { user } = await signInWithPopup(au, provider);
    return user;
  },
  async signOut() {
    await signOut(au);
  },
};
export const timerAPI = {
  async getCounter(userToken) {
    const querySnapshot = await getDoc(doc(db, "users", userToken));
    return querySnapshot.data();
  },
  async addCounter(userToken, counter) {
    console.log(counter);
    await updateDoc(doc(db, "users", userToken), {
      timerCounter: counter,
    });
    return true;
  },
  async getSkillometr(userToken) {
    const querySnapshot = await getDocs(
      collection(db, "users", userToken, "skillometr")
    );
    const res = [];
    querySnapshot.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });
    return res;
  },
  async addTimer(token, title) {
    await addDoc(collection(db, "users", token, "skillometr"), {
      name: title,
      time: 0,
    });
  },
  async deleteTimer(token, id) {
    await deleteDoc(doc(db, "users", token, "skillometr", id));
  },
  async editTime(token, id, time) {
    await updateDoc(doc(db, "users", token, "skillometr", id), {
      time,
    });
  },
};
