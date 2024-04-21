<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Message from "./Message.svelte";
  import { chatHandlers, chatStore } from "$lib/stores/chatStore";
  import { collection, doc, onSnapshot } from "firebase/firestore";
  import { firestore, firestoreCollections } from "$lib/firebase/config.client";
  import { userStore } from "$lib/stores/store";
  onMount(async () => {
    console.log("fetching the chat's");
    const chatId = $chatStore.chatData?.chatid;
    if (!chatId) {
      console.log("No Chat because it has not been initiated");
    }
    const currentChatId = await chatHandlers.fetchChatId(
      $chatStore.chattingWith?.uid || "",
      $userStore.currentUser?.uid || ""
    );
    console.log(currentChatId);

    const unsubscribe = onSnapshot(
      collection(firestore, firestoreCollections.MESSAGES),
      (snapshot) => {
        
        const allMessages = snapshot.docs.map((doc) => doc.data());
        const chatMessages = allMessages.filter(
          (message) => message.chatid === chatId
        );
        console.log(chatMessages);
        console.log($chatStore);
      }
    );
    onDestroy(() => unsubscribe());
  });
</script>

<div class="w-full h-[75vh] overflow-y-scroll flex items-start justify-center">
  <div class="w-full flex flex-col px-3 gap-3"></div>
</div>
