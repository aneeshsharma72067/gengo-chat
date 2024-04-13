<script>
  import { userStore } from "../../lib/stores/store";
  import Button from "$lib/components/ui/Button.svelte";
  import { showToast } from "$lib/components/func/toasts";
  import { redirect } from "@sveltejs/kit";
  import { authHandlers } from "$lib/stores/store";
  import { goto } from "$app/navigation";
  if (!$userStore.currentUser && !$userStore.isUserLoading) {
    goto("/auth/login");
  }
  const handleLogout = async () => {
    await authHandlers.signout();
    showToast("Logged out succesfully", "success");
  };
</script>

<main>
  {#if $userStore.currentUser}
    <div>{$userStore?.currentUser?.username}</div>
  {:else}
    <div
      class="w-32 h-8 bg-gradient-to-r from-slate-500 to-slate-200 animate-pulse"
    ></div>
  {/if}
  <Button on:click={handleLogout}>Logout</Button>
</main>
