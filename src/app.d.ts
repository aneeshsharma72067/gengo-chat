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
      friends: Array<String>;
    }
  }
}

export {};
