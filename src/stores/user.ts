import { writable, type Writable } from "svelte/store";

export const userStore: Writable<App.User | null> = writable(null);

export function setUser(newUser: App.User) {
  userStore.set(newUser);
}

export function logout() {
  userStore.set(null);
}
