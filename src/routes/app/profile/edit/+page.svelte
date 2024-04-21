<script lang="ts">
  import GoTo from "$lib/components/ui/GoTo.svelte";
  import UserIcon from "$lib/components/Icons/UserIcon.svelte";
  import Edit from "$lib/components/Icons/Edit.svelte";
  import InputWithLabel from "$lib/components/ui/InputWithLabel.svelte";

  import { onMount } from "svelte";
  import {userStore} from '$lib/stores/store'


  let userData = {
    fullname: '',
    username: '',
    avatar: null,
  }
  let files: FileList;
  let imageUrl: string | null = null;
  const createFileUrl = () => {
    const selectedImage = files[0];
    const url = URL.createObjectURL(selectedImage);
    imageUrl = url;
    console.log(imageUrl);
  };
</script>

<section>
  <div class="w-[90%] mx-auto flex flex-col gap-5">
    <div class="flex w-full py-4 justify-between">
      <GoTo to="/app/profile" value="Back" icon="back" mode="dark" />
    </div>
    <div class=" px-5">
      <h1 class="text-3xl font-bold text-slate-600">Edit Profile</h1>
    </div>
    <div class="flex items-center justify-center">
      <div class="flex items-center justify-center w-max relative">
        <div
          class="rounded-full aspect-square w-max flex items-center justify-center shadow-[0_8px_30px_rgb(118,103,255,0.42)] overflow-hidden"
        >
          {#if imageUrl}
            <img src={imageUrl} alt="fileNotFound" width="110" height="110" />
          {:else}
            <UserIcon fill="#9f9ef3" size={110} />
          {/if}
        </div>
        <input
          type="file"
          name="avatar"
          id="avatar"
          class="hidden"
          accept="image/png, image/jpeg"
          bind:files
          on:change={() => {
            console.log(files);
            createFileUrl();
          }}
        />
        <label
          for="avatar"
          class="absolute flex items-center bottom-0 right-0 justify-center rounded-full bg-indigo-600 p-[0.3rem] hover:bg-indigo-800 duration-200 cursor-pointer"
        >
          <Edit size={20} strokecolor="#fff" />
        </label>
      </div>

    </div>
    <div class="flex flex-col gap-3">
      <InputWithLabel type="text" value={$userStore.currentUser?.fullname || ''} label="Full Name" name="fullname" placeholder="Enter your full name..." icon="password" class="w-[80%]  mx-auto" />
      <InputWithLabel type="text" value={$userStore.currentUser?.username || ''} label="Username" name="username" placeholder="Enter your username..." icon="password" class="w-[80%]  mx-auto" />
      <InputWithLabel type="text" value={$userStore.currentUser?.bio || ''} label="Bio" name="bio" placeholder="Your bio..." icon="password" class="w-[80%]  mx-auto" />
    </div>
  </div>
</section>
