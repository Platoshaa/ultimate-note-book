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
export const bookmarkAPI = {
  async deleteBookMark(token, id, parentId) {
    let qA = await getDocs(
      query(
        collection(db, "users", token, "articles"),
        where("bookmarkId", "==", id)
      )
    );
    let qB = await getDocs(
      query(
        collection(db, "users", token, "bookmarks"),
        where("parent", "==", id)
      )
    );
    for (let item of [...qA.docs].map((e) => e.id)) {
      await deleteDoc(doc(db, "users", token, "articles", item));
    }
    for (let item of [...qB.docs].map((e) => e.id)) {
      await bookmarkAPI.deleteBookMark(token, item, parentId);
    }
    await deleteDoc(doc(db, "users", token, "bookmarks", id));
    let res = [];
    const p = await bookmarkAPI.getBookMarks(token);
    if (parentId) {
      const c = await bookmarkAPI.getBookMarks(token, parentId);
      res = [c];
    }
    res.push(p);
    return res;
  },
  async renameBookMark(token, id, name, parent = null) {
    const art = await updateDoc(doc(db, "users", token, "bookmarks", id), {
      name,
    });
    return parent
      ? await bookmarkAPI.getBookMarks(token, parent)
      : await bookmarkAPI.getBookMarks(token);
  },

  async getBookMarks(token, parentId = null) {
    const q = query(
      collection(db, "users", token, "bookmarks"),
      where("parent", "==", parentId)
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
    return bookmarkAPI.getBookMarks(token, parentId);
  },
};
export const articleAPI = {
  async getArticles(token, bookmark) {
    const q = query(
      collection(db, "users", token, "articles"),
      where("bookmarkId", "==", bookmark)
    );
    const querySnapshot = await getDocs(q);
    const res = [];
    querySnapshot.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });
    return res.sort((a, b) => a.date - b.date).reverse();
  },
  async getFavoriteArticles(token) {
    const q = query(
      collection(db, "users", token, "articles"),
      where("favorite", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const res = [];
    querySnapshot.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });
    return res.sort((a, b) => a.date - b.date).reverse();
  },
  async deleteArticle(token, id) {
    await deleteDoc(doc(db, "users", token, "articles", id));
  },
  async addArticle(token, bookmarkId) {
    const art = await addDoc(collection(db, "users", token, "articles"), {
      name: "",
      content: "",
      favorite: false,
      bookmarkId,
      date: Date.now(),
    });
    return art.id;
  },
  async updateArticle(token, id, article) {
    const art = await updateDoc(doc(db, "users", token, "articles", id), {
      name: article.name,
      content: article.body,
      date: Date.now(),
    });
    return true;
  },
  async setFavoriteArticle(token, id, favorite) {
    await updateDoc(doc(db, "users", token, "articles", id), {
      favorite,
      date: Date.now(),
    });
    return true;
  },
  async getArticle(token, id) {
    const art = await getDoc(doc(db, "users", token, "articles", id));
    return art.data();
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
