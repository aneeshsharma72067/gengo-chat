import { writable, type Writable } from "svelte/store";

const chatStore: Writable<App.Chat | null> = writable(null);
