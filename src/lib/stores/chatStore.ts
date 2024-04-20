import { addMessage } from "$lib/firebase/chat.client";
import { writable, type Writable } from "svelte/store";

export const chatStore: Writable<App.ChatStore> = writable({
  isChatLoading: false,
  chatData: null,
  chattingWith: null,
});

export const chattingWithStore: Writable<string | null> = writable(null);

export const chatHandlers = {
  sendMessage: async (message:App.Message) => {
    const res = await addMessage(message);
  }
};
