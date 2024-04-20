// See https://kit.svelte.dev/docs/types#app

import type { FieldValue } from "firebase/firestore";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}0
    interface User {
      uid: string;
      username: string;
      email: string;
      fullname?: string;
      photoUrl?: string | null;
      bio?: string;
      createdAt: FieldValue;
      updatedAt: FieldValue;
      friends?: Array<String>;
      socialMedia?: Map<string, string>;
    }
    interface SignupUserData {
      username: string;
      email: string;
      password: string;
    }
    interface LoginUserData {
      email: string;
      password: string;
    }
    interface UserStore {
      isUserLoading: boolean;
      currentUser: App.User | null;
    }
    interface Message {
      content: string;
      sendersId: string;
      receiversId: string;
      sentAt?: FieldValue;
      chatid?: string;
    }
    interface Chat {
      chatid: string;
      messages?: Array<Message>;
    }
    interface ChatStore {
      chatData: Chat | null;
      isChatLoading: boolean;
      chattingWith: App.User | null;
    }
  }
}

export {};
