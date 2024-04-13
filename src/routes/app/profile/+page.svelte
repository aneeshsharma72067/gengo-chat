<script>
  import { userStore } from "$lib/stores/store";
</script>

{#if $userStore.currentUser}
  <div>
    <div class="bg w-full h-20"></div>
    {$userStore.currentUser.username}
  </div>
{:else}
  <div>Loading....</div>
{/if}

<style>
  .bg {
    background-image: radial-gradient(
      circle 897px at 9% 80.3%,
      rgba(55, 60, 245, 1) 0%,
      rgba(234, 161, 15, 0.9) 100.2%
    );
  }
</style>
