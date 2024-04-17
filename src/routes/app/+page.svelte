<script>
  import { userStore } from "../../lib/stores/store";
  import { showToast } from "$lib/components/func/toasts";
  import { redirect } from "@sveltejs/kit";
  import { authHandlers } from "$lib/stores/store";
  import { goto } from "$app/navigation";

  // Component Imports
  import Button from "$lib/components/ui/Button.svelte";
  import UserIcon from "$lib/components/Icons/UserIcon.svelte";
  import Menu from "$lib/components/Icons/Menu.svelte";

  if (!$userStore.currentUser && !$userStore.isUserLoading) {
    goto("/auth/login");
  }
  const handleLogout = async () => {
    await authHandlers.signout();
    showToast("Logged out succesfully", "success");
  };
</script>

<main>
  <div class="w-full flex flex-col bg-[#4e3ee6] min-h-screen">
    <section class="w-full px-5 h-20 flex items-center justify-between">
      <div>
        <h2 class="text-3xl text-white font-bold">Chats</h2>
      </div>
      <div class="flex gap-2 items-center">
        <div class="rounded-full overflow-hidden">
          {#if $userStore.currentUser?.photoUrl}
            <img src={$userStore.currentUser?.photoUrl} alt="profile" />
          {:else}
            <UserIcon />
          {/if}
        </div>
        <div>
          <Menu size={10} />
        </div>
      </div>
    </section>
    <section class="w-full py-4 bg-white rounded-3xl min-h-svh"></section>
  </div>
</main>
