<script lang="ts">
  import { userStore } from "$lib/stores/store";
  import { showToast } from "$lib/components/func/toasts";
  import { authHandlers, dataHandlers } from "$lib/stores/store";
  import { goto } from "$app/navigation";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { chatStore } from "$lib/stores/chatStore";
  import { chatHandlers } from "$lib/stores/chatStore";

  // Component Imports
  import Button from "$lib/components/ui/Button.svelte";
  import UserIcon from "$lib/components/Icons/UserIcon.svelte";
  import Menu from "$lib/components/Icons/Menu.svelte";
  import Settings from "$lib/components/Icons/Settings.svelte";
  import Logout from "$lib/components/Icons/Logout.svelte";
  import Search from "$lib/components/Icons/Search.svelte";
  import Chat from "$lib/components/ui/Chat.svelte";
  import ChatSkeletonLoader from "$lib/components/ui/ChatSkeletonLoader.svelte";
  import Loader from "$lib/components/ui/Loader.svelte";
  import ChatPage from "$lib/components/ui/ChatPage.svelte";
  import ChevronBack from "$lib/components/Icons/ChevronBack.svelte";
  import EllipsisVertical from "$lib/components/Icons/EllipsisVertical.svelte";
  import Send from "$lib/components/Icons/Send.svelte";

  let showMenu: boolean = false;
  let chatIsOpen: boolean = false;
  let sendingMessage: boolean = false;
  let users: Array<App.User> = [];
  let imageIsLoded = false;

  const message: App.Message = {
    content: "",
    sendersId: $userStore.currentUser ? $userStore.currentUser.uid : "",
    receiversId: $chatStore.chattingWith ? $chatStore.chattingWith.uid : "",
    chatid: $chatStore.chatData?.chatid,
  };
  chatStore.subscribe((val) => {
    message.receiversId = val.chattingWith ? val.chattingWith.uid : null;
    message.chatid = val.chatData?.chatid;
  });
  if (!$userStore.currentUser && !$userStore.isUserLoading) {
    goto("/auth/login");
  }
  const handleLogout = async () => {
    await authHandlers.signout();
    showToast("Logged out succesfully", "success");
  };

  const toggleChat = (user?: App.User) => {
    message.content = "";
    if (chatIsOpen) {
      chatStore.set({
        chatData: null,
        chattingWith: null,
        isChatLoading: false,
      });
    } else {
      chatStore.set({
        ...$chatStore,
        chattingWith: user || null,
        isChatLoading: false,
      });
      const chatContainer = document.getElementById("chat-container");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer?.scrollHeight;
      }
    }
    chatIsOpen = !chatIsOpen;
  };

  const sendMessage = async () => {
    sendingMessage = true;
    const res = await chatHandlers.sendMessage(message);
    sendingMessage = false;
    message.content = "";
  };

  onMount(async () => {
    if ($userStore.currentUser) {
      users = await dataHandlers.getAllUsers($userStore.currentUser.uid);
    }
  });
  let msg = "";
</script>

<title>Chats</title>
<main>
  <div class="w-full flex flex-col bg-indigo-500 min-h-screen relative">
    {#if chatIsOpen}
      <section
        class="fixed top-0 right-0 md:hidden z-50 h-[93vh] md:h-screen w-screen mx-auto bg-gradient-to-b from-indigo-200 to-indigo-300 duration-300"
      >
        <div
          class="flex flex-col w-[95%] gap-3 h-full max-h-full mx-auto py-3 justify-between"
        >
          <div
            class="flex items-center gap-4 justify-between bg-indigo-600 px-3 py-2 rounded-full"
          >
            <button
              on:click={() => toggleChat()}
              class="flex gap-1 duration-300 items-center justify-center rounded-full bg-white px-2 py-1 hover:bg-slate-200 cursor-pointer"
            >
              <span><ChevronBack size={17} strokecolor="black" /></span>
              <span class="text-slate-700 text-sm">Back</span>
            </button>
            <div class="flex items-center justify-start w-full gap-2">
              {#if $chatStore.chattingWith?.photoUrl}
                <img
                  src={$chatStore.chattingWith?.photoUrl}
                  alt=""
                  on:load={() => {
                    imageIsLoded = true;
                  }}
                  width={40}
                  height={40}
                />
              {:else}
                <UserIcon size={40} />
              {/if}

              <p class="text-lg text-white">
                {#if $chatStore.isChatLoading || !$chatStore.chattingWith}
                  Loading...
                {:else}
                  {$chatStore.chattingWith?.username}
                {/if}
              </p>
            </div>
          </div>
          <div class="w-full h-full">
            <ChatPage />
          </div>
          <div class="">
            <div class="flex gap-4">
              <input
                type="text"
                name="messageInput"
                id="messageInput"
                class="border-none w-full outline-none rounded-full px-4 py-2"
                placeholder="Enter a Message..."
                bind:value={message.content}
                on:keydown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button
                on:click={sendMessage}
                class="flex items-center justify-center rounded-full bg-indigo-500 p-3 duration-100 hover:bg-[#4e3ee6]"
              >
                {#if sendingMessage}
                  <Loader size={25} />
                {:else}
                  <Send size={25} />
                {/if}
              </button>
            </div>
          </div>
        </div>
      </section>
    {/if}
    {#if showMenu}
      <section
        class="absolute top-[5.5rem] right-2 text-white"
        transition:slide={{ axis: "x" }}
      >
        <div class="flex flex-col rounded-3xl overflow-hidden items-center">
          <div class="">
            <div class="menu-item pt-4 pb-2">
              <span><Settings size={30} /></span>
              <span class="text-lg">Settings</span>
            </div>
          </div>
          <div class="">
            <button class="menu-item pt-2 pb-4" on:click={handleLogout}>
              <span><Logout size={30} /></span>
              <span class="text-lg">Logout</span>
            </button>
          </div>
        </div>
      </section>
    {/if}
    <div class="flex">
      <div class="flex flex-1 flex-col bg-indigo-600 min-h-screen items-center">
        <section class="w-full px-5 h-20 flex items-center justify-between">
          <div>
            <h2 class="text-3xl text-white font-bold">Chats</h2>
          </div>
          <div class="flex gap-5 items-center">
            <a href="/app/profile" class="rounded-full overflow-hidden">
              {#if $userStore.currentUser?.photoUrl}
                <img
                  src={$userStore.currentUser?.photoUrl}
                  alt="profile"
                  width="46"
                  height="46"
                />
              {:else}
                <UserIcon />
              {/if}
            </a>
            <div>
              <Menu
                size={40}
                on:click={() => {
                  showMenu = !showMenu;
                }}
              />
            </div>
          </div>
        </section>
        <section class="w-full py-4 bg-white rounded-3xl min-h-[90vh]">
          <div class="w-[90%] mx-auto">
            <div
              class="flex items-center gap-4 border-2 border-indigo-400 rounded-3xl pl-3 overflow-hidden"
            >
              <Search fill="#4e3ee6" size={30} />
              <input
                type="text"
                class="outline-none border-none w-full py-3"
                placeholder="Search...."
              />
            </div>
          </div>
          {#if users.length == 0}
            <div class="w-[90%] mx-auto flex flex-col gap-2 mt-10">
              <ChatSkeletonLoader />
              <ChatSkeletonLoader />
              <ChatSkeletonLoader />
            </div>
          {:else}
            <div class="w-[90%] mx-auto flex flex-col gap-2 mt-10">
              {#each users as user}
                <Chat {user} on:click={() => toggleChat(user)} />
              {/each}
            </div>
          {/if}
        </section>
      </div>
      <div class="flex-1 hidden md:flex">
        <section
          class="z-50 w-full mx-auto bg-gradient-to-b from-indigo-200 to-indigo-300 duration-300"
        >
          {#if !$chatStore.chattingWith}
            <div class="w-full h-full flex items-center justify-center">
              <div>No Chat Selected</div>
            </div>
          {:else}
            <div
              class="flex flex-col w-[95%] gap-3 h-full max-h-full mx-auto py-3 justify-between"
            >
              <div
                class="flex items-center gap-4 justify-between bg-indigo-600 px-3 py-2 rounded-full"
              >
                <div class="flex items-center justify-start w-full gap-2">
                  {#if $chatStore.chattingWith?.photoUrl}
                    <img
                      src={$chatStore.chattingWith?.photoUrl}
                      alt=""
                      on:load={() => {
                        imageIsLoded = true;
                      }}
                      width={40}
                      height={40}
                    />
                  {:else}
                    <UserIcon size={40} />
                  {/if}

                  <p class="text-lg text-white">
                    {#if $chatStore.isChatLoading || !$chatStore.chattingWith}
                      Loading...
                    {:else}
                      {$chatStore.chattingWith?.username}
                    {/if}
                  </p>
                </div>
              </div>
              <div class="w-full h-full">
                <ChatPage />
              </div>
              <div class="">
                <div class="flex gap-4">
                  <input
                    type="text"
                    name="messageInput"
                    id="messageInput"
                    class="border-none w-full outline-none rounded-full px-4 py-2"
                    placeholder="Enter a Message..."
                    bind:value={message.content}
                    on:keydown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                  <button
                    on:click={sendMessage}
                    class="flex items-center justify-center rounded-full bg-indigo-500 p-3 duration-100 hover:bg-[#4e3ee6]"
                  >
                    {#if sendingMessage}
                      <Loader size={25} />
                    {:else}
                      <Send size={25} />
                    {/if}
                  </button>
                </div>
              </div>
            </div>
          {/if}
        </section>
      </div>
    </div>
  </div>
</main>

<style>
  .menu-item {
    @apply flex gap-2 items-center bg-[#4e3ee6] px-5 w-36 cursor-pointer;
  }
</style>
