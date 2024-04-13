<script>
  import { goto } from "$app/navigation";
  import Toast from "$lib/components/ui/Toast.svelte";
  import "../app.css";
  import { userStore } from "../lib/stores/store";
  userStore.subscribe((data) => {
    if (data) {
      console.log("redirecting to /app because user found");
      goto("/app");
    } else {
      console.log("redirecting to /auth/login because user not found");
      goto("/auth/login");
    }
  });
</script>

<div class="bg-slate-100 w-screen min-h-screen h-screen text-slate-800">
  <Toast />
  <slot />
</div>
