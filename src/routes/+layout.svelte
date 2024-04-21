<script lang="ts">
  import "../app.css";
  import { firebaseAuth } from "$lib/firebase/config.client";
  import { getUserData } from "$lib/firebase/user.client";
  import Toast from "$lib/components/ui/Toast.svelte";
  import { onMount } from "svelte";
  import { userStore } from "$lib/stores/store";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import PageLoader from "$lib/components/ui/PageLoader.svelte";
  let loading: boolean = true;

  onMount(() => {
    loading = true;
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const userData = (await getUserData(user.uid)) as App.User;
        userStore.update((curr) => {
          console.log("New User : ", userData);
          return { ...curr, isUserLoading: false, currentUser: userData };
        });
        if ($page.url.pathname.includes("auth") || $page.url.pathname == "/") {
          goto("/app");
        }
      } else {
        userStore.update((curr) => {
          return { ...curr, isUserLoading: false, currentUser: null };
        });
        console.log("goto login called from root layout");
        goto("/auth/login");
      }
    });
    loading = false;
  });
</script>

{#if $userStore.isUserLoading}
  <div
    class="bg-slate-100 w-screen min-h-screen h-screen text-slate-800 overflow-x-hidden"
  >
    <div class="w-full h-1/2 flex items-center justify-center">
      <PageLoader />
    </div>
  </div>
{:else}
  <div
    class="bg-slate-100 w-screen min-h-screen h-screen text-slate-800 overflow-x-hidden"
  >
    <Toast />
    <slot />
  </div>
{/if}
