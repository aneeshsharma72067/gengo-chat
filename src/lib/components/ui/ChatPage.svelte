<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Message from "./Message.svelte";
  import { chatStore } from "$lib/stores/chatStore";
  import { collection, doc, onSnapshot } from "firebase/firestore";
  import { firestore, firestoreCollections } from "$lib/firebase/config.client";
  onMount(() => {
    console.log("fetching the chat's");
    const chatId = $chatStore.chatData?.chatid;
    if (!chatId) {
      console.log("No Chat because it has not been initiated");
      return;
    } 
    const unsubscribe = onSnapshot(
      collection(firestore, firestoreCollections.MESSAGES),
      (snapshot) => {
        chatStore.set({
          ...$chatStore,
          chatData: null,
          isChatLoading: true,
        });
        const allMessages = snapshot.docs.map((doc) => doc.data());
        const chatMessages = allMessages.filter(
          (message) => message.chatId === chatId
        );
        chatStore.set({
          ...$chatStore,
          chatData: {
            chatid: chatMessages[0].chatId,
            messages: chatMessages as Array<App.Message>,
          },
          isChatLoading: true,
        });
        console.log($chatStore.chatData);
      }
    );
    onDestroy(() => unsubscribe());
  });
</script>

<div class="w-full h-[75vh] overflow-y-scroll flex items-start justify-center">
  <div class="w-full flex flex-col px-3 gap-3"></div>
</div>
