import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc
  // query,
  // where
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const FirebaseContextholder = createContext(null);

// export const useFirebase = () => useContext(FirebaseContextholder);
const firebaseConfig = {
  apiKey: "AIzaSyBvrcOuziS-Ko73uNXqNU-UVhf27a_PKeY",
  authDomain: "ink-and-pages.firebaseapp.com",
  projectId: "ink-and-pages",
  storageBucket: "ink-and-pages.appspot.com",
  messagingSenderId: "167406681117",
  appId: "1:167406681117:web:95e2bf0bb844c806199af4",
  measurementId: "G-Q2XY0Y0YCT"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestrore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FireBasseProvider = (props) => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });
  }, []);
  const isloggedin = user ? true : false;
  const signupuser = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signinuser = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signinwithgoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const addlisting = async (name, ISBN, price, coverpic, authorname) => {
    const imageref = ref(
      storage,
      `uploads/images/${Date.now()}-${coverpic.name}`
    );

    const uploadresult = await uploadBytes(imageref, coverpic);
    return await addDoc(collection(firestrore, "books"), {
      name,
      ISBN,
      price,
      authorname,
      imageURL: uploadresult.ref.fullPath
      // userID: user.uid,
      // userEmail: user.email,
      // displayname: user.displayName,
      // photoURL: user.photoURL
    });
  };

  const listallbooks = () => {
    return getDocs(collection(firestrore, "books"));
  };

  const getBookById = async (id) => {
    const docRef = doc(firestrore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const placeorder = async (bookId, quantity) => {
    if (user) {
      const collectionref = collection(firestrore, "books", bookId, "orders");
      const result = await addDoc(collectionref, {
        userID: user.uid,
        userEmail: user.email,
        photoURL: user.photoURL,
        quantity
      });
      return result;
    } else {
      // Handle the case when the user is null (not logged in)
      // You can show an error message or redirect the user to the login page
      console.log("User is not logged in");
    }
  };

  // const fetchMybooks = async (userId) => {
  //   const collectionRef = collection(firestrore, "books");
  //   const q = query(collectionRef, where("userID", "==", user.uid));
  //   const result = await getDocs(q);
  //   return result;
  // };
  return (
    <FirebaseContextholder.Provider
      value={{
        signupuser,
        signinuser,
        signinwithgoogle,
        isloggedin,
        addlisting,
        listallbooks,
        getBookById,
        getImageURL,
        placeorder,
        // fetchMybooks,
        user
      }}
    >
      {props.children}
    </FirebaseContextholder.Provider>
  );
};
