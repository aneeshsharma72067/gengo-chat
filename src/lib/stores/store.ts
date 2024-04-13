import { FieldValue } from "firebase/firestore";
import { writable, type Writable } from "svelte/store";

export const tempUser: App.User = {
  username: "john",
  uid: "temp-uid",
  email: "",
  createdAt: FieldValue.prototype,
  updatedAt: FieldValue.prototype,
};

export const userStore: Writable<App.User | null> = writable(null);

export function setUser(newUser: App.User | null) {
  userStore.set(newUser);
}

export function logout() {
  userStore.set(null);
}

userStore.subscribe((val) => {
  console.log("UserData value changes to : ", val);
});
