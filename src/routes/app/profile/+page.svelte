<script>
  import { userStore } from "$lib/stores/store";
  import GradientBackground from "$lib/components/ui/GradientBackground.svelte";
  import Email from "$lib/components/Icons/Email.svelte";
  import Instagram from "$lib/components/Icons/Instagram.svelte";
  import ChevronBack from "$lib/components/Icons/ChevronBack.svelte";
  import GoTo from "$lib/components/ui/GoTo.svelte";
</script>

{#if $userStore.currentUser}
  <div class="relative">
    <div class="flex w-full p-5 justify-between">
      <GoTo to="/app" value="Back" icon="back" />
      <GoTo to="/app/profile/edit" value="Edit" icon="edit" />
    </div>
    <div class="w-full h-14">
      <GradientBackground />
    </div>
    <div
      class="relative flex flex-col items-center gap-5 z-10 tex-5xl text-center w-4/5 mx-auto -my-16 text-slate-700"
    >
      <div class="">
        <p class="text-2xl text-white">{$userStore.currentUser.username}</p>
      </div>
      <div class="flex items-center justify-center">
        {#if $userStore.currentUser.photoUrl}
          <img
            src={$userStore.currentUser.photoUrl}
            alt="profile"
            class="rounded-full aspect-square"
          />
        {:else}
          <div
            class="w-32 h-32 rounded-full bg-red-500 border-4 border-white"
          ></div>
        {/if}
      </div>
      <div>
        <p class="text-slate-500">
          {#if $userStore.currentUser.bio === ""}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            vitae quaerat eveniet dicta necessitatibus in, mollitia recusandae.
            Iusto porro inventore dolore.
          {:else}
            {$userStore.currentUser.bio}
          {/if}
        </p>
      </div>
      <div class="flex flex-col items-center overflow-hidden rounded-md">
        <div
          class="flex items-center justify-center rounded-t-md gap-8 border border-slate-500 px-10 py-3"
        >
          <span>
            <Email size={26} />
          </span>
          <span>
            {$userStore.currentUser.email}
          </span>
        </div>
        {#if $userStore.currentUser?.socialMedia}
          <div
            class="flex items-center justify-center rounded-b-md gap-8 border border-slate-500 px-10 py-3"
          >
            <span>
              <Instagram size={26} />
            </span>
            <span>
              {$userStore.currentUser.socialMedia.get("instagram")}
            </span>
          </div>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <div>Loading....</div>
{/if}

<style>
</style>
