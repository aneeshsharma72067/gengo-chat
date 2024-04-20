import { FieldValue } from "firebase/firestore";
import { writable, type Writable } from "svelte/store";
import { firebaseAuth } from "$lib/firebase/config.client";
import {
  getAllUsers,
  loginUser,
  logout,
  signupUser,
} from "$lib/firebase/user.client";

export const tempUser: App.User = {
  username: "john",
  uid: "temp-uid",
  email: "",
  createdAt: FieldValue.prototype,
  updatedAt: FieldValue.prototype,
};

export const userStore: Writable<App.UserStore> = writable({
  isUserLoading: true,
  currentUser: null,
});

export const authHandlers = {
  login: async ({ email, password }: App.LoginUserData) => {
    const res = await loginUser({ email, password });
    return res;
  },
  signup: async ({ username, email, password }: App.SignupUserData) => {
    const res = await signupUser({ username, email, password });
    return res;
  },
  signout: async () => {
    await logout();
  },
};

export const dataHandlers = {
  getAllUsers: async (uid:string) => {
    const res = await getAllUsers(uid);
    return res;
  },
};
