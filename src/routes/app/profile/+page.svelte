<script>
  import { userStore } from "$lib/stores/store";
  import GradientBackground from "$lib/components/ui/GradientBackground.svelte";
</script>

{#if $userStore.currentUser}
  <div>
    <div class="-z-10 h-24">
      <GradientBackground />
    </div>
    <div class="relative z-10 tex-5xl text-slate-700">
      <div class="flex items-center justify-center">
        {#if $userStore.currentUser.photoUrl}
        <img src={$userStore.currentUser.photoUrl} alt="profile" class="rounded-full aspect-square">
        {:else}
        <div class="w-32 h-32 rounded-full bg-red-500 border-4 border-white"></div>
        {/if}
    </div>
    {$userStore.currentUser.username}
    </div>
  </div>
{:else}
  <div>Loading....</div>
{/if}

<style>
</style>
