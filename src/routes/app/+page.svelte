<script>
  import { userStore, setUser } from "../../lib/stores/store";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/Button.svelte";
  import { showToast } from "$lib/components/func/toasts";
  import { _logoutUser } from "./+page";

  const handleLogout = async () => {
    const res = await _logoutUser();
    setUser(null);
    console.log(res);
  };

  userStore.subscribe((data) => {
    if (!data) {
      showToast("Logged out succesfully", "success");
      goto("/auth/login");
    }
  });
</script>

<main>
  {#if $userStore}
    <div>{$userStore?.username}</div>
  {:else}
    <div
      class="w-32 h-8 bg-gradient-to-r from-slate-500 to-slate-200 animate-pulse"
    ></div>
  {/if}
  <Button on:click={handleLogout}>Logout</Button>
</main>
