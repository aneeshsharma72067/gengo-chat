import {
  createUserWithEmailAndPassword,
  getAuth,
  type UserCredential,
} from "firebase/auth";
import { app } from "./config";
import type { FirebaseError } from "firebase/app";

const firebaseAuth = getAuth(app);

type UserFormData = {
  username: string;
  email: string;
  password: string;
};

export const loginUser = async () => {};

export const signupUser = async (userData: UserFormData) => {
  const { username, email, password } = userData;
  try {
    const newUser: UserCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    console.log(newUser);
    return {
      success: true,
      error: null,
      uid: newUser.user.uid,
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
