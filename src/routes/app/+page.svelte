<script>
  import { userStore } from "../../lib/stores/store";
  import { showToast } from "$lib/components/func/toasts";
  import { redirect } from "@sveltejs/kit";
  import { authHandlers } from "$lib/stores/store";
  import { goto } from "$app/navigation";
  import { slide, fade, blur, scale } from "svelte/transition";

  // Component Imports
  import Button from "$lib/components/ui/Button.svelte";
  import UserIcon from "$lib/components/Icons/UserIcon.svelte";
  import Menu from "$lib/components/Icons/Menu.svelte";
  import Settings from "$lib/components/Icons/Settings.svelte";
  import Logout from "$lib/components/Icons/Logout.svelte";
  import Search from "$lib/components/Icons/Search.svelte";

  let showMenu = false;
  if (!$userStore.currentUser && !$userStore.isUserLoading) {
    goto("/auth/login");
  }
  const handleLogout = async () => {
    await authHandlers.signout();
    showToast("Logged out succesfully", "success");
  };
</script>

<main>
  <div class="w-full flex flex-col bg-[#4e3ee6] min-h-screen relative">
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
      <div class="w-[90%] mx-auto flex flex-col gap-2 mt-10">
        <div
          class="flex gap-2 duration-300 rounded-3xl p-3 cursor-pointer hover:bg-slate-200"
        >
          <div class="flex-[0.1]">
            <UserIcon fill="#4e3ee6" size={50} />
          </div>
          <div class="flex flex-[0.9] flex-col items-start gap-1">
            <div>Mia</div>
            <div class="text-sm text-slate-400">
              Lorem ipsum, dolor sit amet consectetur ...
            </div>
          </div>
        </div>
        <div
          class="flex gap-2 duration-300 rounded-3xl p-3 cursor-pointer hover:bg-slate-200"
        >
          <div class="flex-[0.1]">
            <UserIcon fill="#4e3ee6" size={50} />
          </div>
          <div class="flex flex-[0.9] flex-col items-start gap-1">
            <div>John</div>
            <div class="text-sm text-slate-400">
              Lorem ipsum, dolor sit amet consectetur ...
            </div>
          </div>
        </div>
        <div
          class="flex gap-2 duration-300 rounded-3xl p-3 cursor-pointer hover:bg-slate-200"
        >
          <div class="flex-[0.1]">
            <UserIcon fill="#4e3ee6" size={50} />
          </div>
          <div class="flex flex-[0.9] flex-col items-start gap-1">
            <div>Alex</div>
            <div class="text-sm text-slate-400">
              Lorem ipsum, dolor sit amet consectetur ...
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

<style>
  .menu-item {
    @apply flex gap-2 items-center bg-[#4e3ee6] px-5 w-36 cursor-pointer;
  }
</style>
