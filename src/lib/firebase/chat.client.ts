import { addDoc, collection, getDocs, or, query, serverTimestamp, where } from "firebase/firestore";
import { firestore } from "./config.client";
import type { FirebaseError } from "firebase/app";

const addMessage = async (message: App.Message) => {
  try {
    const {chatid} = message
    if(chatid){
      const messageSnapshot = await addDoc(
        collection(firestore, 'messages'), {
          ...message,
          sentAt:serverTimestamp()
        }
      )
      return {
        success:true,
        error:null
      }
    }
    const messageSnapshot = await addDoc(
      collection(firestore, "messages"),
      message
    );
    return {
      success: true,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      error: (err as FirebaseError)?.message,
    };
  }
};
