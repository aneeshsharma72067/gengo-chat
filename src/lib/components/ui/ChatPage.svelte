<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Message from "./Message.svelte";
  import { chatHandlers, chatStore } from "$lib/stores/chatStore";
  import {
    collection,
    doc,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
  } from "firebase/firestore";
  import { firestore, firestoreCollections } from "$lib/firebase/config.client";
  import { userStore } from "$lib/stores/store";
  onMount(async () => {
    console.log("component mounted");
    const chatContainer = document.getElementById("chat-container");
    chatStore.set({
      ...$chatStore,
      isChatLoading: true,
    });
    const currentChatId = await chatHandlers.fetchChatId(
      $chatStore.chattingWith?.uid || "",
      $userStore.currentUser?.uid || ""
    );
    const chatId = currentChatId.data?.chatid;
    chatStore.set({
      ...$chatStore,
      chatData: {
        chatid: chatId,
      },
    });
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, firestoreCollections.MESSAGES),
        where("chatid", "==", chatId),
        orderBy("sentAt", "asc"),
        limit(30)
      ),
      (snapshot) => {
        const chatMessages = snapshot.docs.map((doc) => doc.data());

        chatStore.set({
          ...$chatStore,
          chatData: {
            chatid: $chatStore.chatData?.chatid || "",
            messages: chatMessages as Array<App.Message>,
          },
          isChatLoading: false,
        });
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer?.scrollHeight;
        }
      }
    );
    onDestroy(() => {
      unsubscribe();
      console.log("component dismounted");

      chatStore.set({
        chatData: null,
        chattingWith: null,
        isChatLoading: false,
      });
    });
  });
</script>

<div
  class="w-full h-[70vh] md:h-[75vh] overflow-y-scroll flex items-start justify-center"
  id="chat-container"
>
  <div class="w-full flex flex-col px-3 gap-3">
    {#if $chatStore.isChatLoading}
      <div class="px-4 py-2 rounded-md text-white bg-indigo-500 self-center">
        Loading Chats...
      </div>
    {:else if $chatStore.chatData?.messages}
      {#each $chatStore.chatData.messages as message}
        <Message {message} />
      {/each}
    {/if}
  </div>
</div>
