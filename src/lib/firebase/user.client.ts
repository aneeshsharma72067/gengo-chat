import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";
import { firebaseAuth, firestore } from "./config.client";
import type { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export const loginUser = async (userData: App.LoginUserData) => {
  const { email, password } = userData;
  try {
    const getUser = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const userSnapShot = await getDocs(
      query(
        collection(firestore, "users"),
        where("uid", "==", getUser.user.uid)
      )
    );
    const user = userSnapShot.docs[0].data();
    return {
      success: true,
      error: null,
      userData: user,
    };
  } catch (error) {
    const errorMessage = (error as FirebaseError)?.message;
    console.log((error as FirebaseError)?.message);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const signupUser = async (userData: App.SignupUserData) => {
  const { username, email, password } = userData;
  try {
    const newUser: UserCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user: App.User = {
      username,
      email,
      uid: newUser.user.uid,
      fullname: "",
      bio: "",
      createdAt: serverTimestamp(),
      photoUrl: null,
      updatedAt: serverTimestamp(),
      friends: [],
    };
    const result = await addDoc(collection(firestore, "users"), user);
    return {
      success: true,
      error: null,
      userData: user,
    };
  } catch (error) {
    const errorMessage = (error as FirebaseError)?.message;
    console.log((error as FirebaseError)?.message+'|');
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const getUserData = async (uid: string) => {
  const userSnapShot = await getDocs(
    query(collection(firestore, "users"), where("uid", "==", uid))
  );
  if (userSnapShot.empty) {
    return;
  }
  const user = userSnapShot.docs[0].data();
  return user;
};

export const logout = async () => {
  await signOut(firebaseAuth)
    .then(() => {
      console.log("logged out");
    })
    .catch((err) => {
      console.log(err, "Error in logging out");
    });
};
