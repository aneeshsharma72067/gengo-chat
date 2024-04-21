import {
  addDoc,
  and,
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
    const { chatid, sendersId, receiversId } = message;
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
    const fetchId = await getChatId(sendersId, receiversId || "");
    const messageSnapshot = await addDoc(
      collection(firestore, firestoreCollections.MESSAGES),
      {
        ...message,
        chatid: fetchId?.data?.chatid,
        sentAt: serverTimestamp(),
      }
    );

    return {
      success: true,
      error: null,
      data: {
        chatid: fetchId?.data?.chatid,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: (err as FirebaseError)?.message,
    };
  }
};

export const getChatId = async (user1id: string, user2id: string) => {
  try {
    const chatSnapShot = await getDocs(
      query(
        collection(firestore, firestoreCollections.CHATS),
        or(
          and(where("user1id", "==", user1id), where("user2id", "==", user2id)),
          and(where("user2id", "==", user1id), where("user1id", "==", user2id))
        )
      )
    );
    if (!chatSnapShot.empty) {
      console.log("Chat ID found");
      const data = chatSnapShot.docs[0].data();
      return {
        success: true,
        error: null,
        data: {
          chatid: data.chatid,
        },
      };
    }
    console.log("Chat ID Not found");

    const newChatId = uuid4();
    const newChat = await addDoc(
      collection(firestore, firestoreCollections.CHATS),
      {
        chatid: newChatId,
        user1id: user1id,
        user2id: user2id,
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
      error: (err as FirebaseError).message,
    };
  }
};
