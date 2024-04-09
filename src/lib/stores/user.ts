import { temporaryUser } from "$lib/temp";
import { writable, type Writable } from "svelte/store";

export const userStore: Writable<App.User | null> = writable(temporaryUser);

export function setUser(newUser: App.User) {
  userStore.set(newUser);
}

export function logout() {
  userStore.set(null);
}
