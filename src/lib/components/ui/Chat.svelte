<script lang="ts">
  import UserIcon from "$lib/components/Icons/UserIcon.svelte";
  export let user: App.User | null = null;
</script>

<div
  class="flex gap-2 duration-300 rounded-3xl p-3 cursor-pointer hover:bg-slate-200"
  on:click
  on:keydown
  role="button"
  tabindex="-1"
>
  <div class="flex-[0.15]">
    {#if user?.photoUrl}
      <div class="w-12 flex items-center justify-center">
        <img src={user.photoUrl} alt="avatar.png" width="100%" height="100%" />
      </div>
    {:else}
      <UserIcon fill="#4e3ee6" size={50} />
    {/if}
  </div>
  <div class="flex flex-[0.85] flex-col items-start gap-1">
    <div>{user?.username}</div>
    <div class="text-sm text-slate-400 max-w-full">
      Lorem ipsum, dolor sit amet pringelfasf...
    </div>
  </div>
</div>
