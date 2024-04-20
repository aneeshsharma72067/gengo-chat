import {
  addDoc,
  collection,
  getDocs,
  or,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firestore, firestoreCollections } from "./config.client";
import type { FirebaseError } from "firebase/app";
import { v4 as uuid4 } from "uuid";

export const addMessage = async (message: App.Message) => {
  try {
    const { chatid } = message;
    if (chatid) {
      const messageSnapshot = await addDoc(
        collection(firestore, firestoreCollections.MESSAGES),
        {
          ...message,
          sentAt: serverTimestamp(),
        }
      );
      return {
        success: true,
        error: null,
        data: {
          chatid: chatid,
        },
      };
    }
    const newChatId = uuid4();
    const messageSnapshot = await addDoc(
      collection(firestore, firestoreCollections.MESSAGES),
      {
        ...message,
        chatid: newChatId,
        sentAt: serverTimestamp(),
      }
    );
    return {
      success: true,
      error: null,
      data: {
        chatid: newChatId,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: (err as FirebaseError)?.message,
    };
  }
};
