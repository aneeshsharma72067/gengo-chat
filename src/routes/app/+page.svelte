<script lang="ts">
  import { userStore } from "../../lib/stores/store";
  import { showToast } from "$lib/components/func/toasts";
  import { redirect } from "@sveltejs/kit";
  import { authHandlers, dataHandlers } from "$lib/stores/store";
  import { goto } from "$app/navigation";
  import { slide, fade, blur, scale } from "svelte/transition";
  import { onMount } from "svelte";

  // Component Imports
  import Button from "$lib/components/ui/Button.svelte";
  import UserIcon from "$lib/components/Icons/UserIcon.svelte";
  import Menu from "$lib/components/Icons/Menu.svelte";
  import Settings from "$lib/components/Icons/Settings.svelte";
  import Logout from "$lib/components/Icons/Logout.svelte";
  import Search from "$lib/components/Icons/Search.svelte";
  import Chat from "$lib/components/ui/Chat.svelte";
  import ChatSkeletonLoader from "$lib/components/ui/ChatSkeletonLoader.svelte";
  import ChatPage from "$lib/components/ui/ChatPage.svelte";

  let showMenu: boolean = false;
  let chatIsOpen: boolean = false;
  let users: Array<App.User> = [];

  if (!$userStore.currentUser && !$userStore.isUserLoading) {
    goto("/auth/login");
  }
  const handleLogout = async () => {
    await authHandlers.signout();
    showToast("Logged out succesfully", "success");
  };
  onMount(async () => {
    users = await dataHandlers.getAllUses();
    console.log(users);
  });
</script>

<main>
  <div class="w-full flex flex-col bg-[#4e3ee6] min-h-screen relative">
    {#if chatIsOpen}
      <section
        class="absolute top-0 left-0 z-50 min-h-screen min-w-full mx-auto bg-indigo-200 duration-300"
        transition:slide={{ axis: "x" }}
      >
        Chat Page
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
    <section class="w-full px-5 h-20 flex items-center justify-between">
      <div>
        <h2 class="text-3xl text-white font-bold">Chats</h2>
      </div>
      <div class="flex gap-5 items-center">
        <a href="/app/profile" class="rounded-full overflow-hidden">
          {#if $userStore.currentUser?.photoUrl}
            <img src={$userStore.currentUser?.photoUrl} alt="profile" />
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
    <section class="w-full py-4 bg-white rounded-3xl min-h-svh">
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
            <Chat
              {user}
              on:click={() => {
                chatIsOpen = !chatIsOpen;
              }}
            />
          {/each}
        </div>
      {/if}
    </section>
  </div>
</main>

<style>
  .menu-item {
    @apply flex gap-2 items-center bg-[#4e3ee6] px-5 w-36 cursor-pointer;
  }
</style>
