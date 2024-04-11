import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  type UserCredential,
} from "firebase/auth";
import { app, firebaseAuth, firestore } from "./config";
import type { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { setUser, userStore } from "$lib/stores/user";

type SignupUserData = {
  username: string;
  email: string;
  password: string;
};

type LoginUserData = {
  email: string;
  password: string;
};

export const loginUser = async (userData: LoginUserData) => {
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

export const signupUser = async (userData: SignupUserData) => {
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
    console.log(user);
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
