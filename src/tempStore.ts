import { writable } from "svelte/store";

export const temp = writable(0);

export const setTemp = (n: number) => {
  temp.set(n);
};
