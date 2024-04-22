<script lang="ts">
  import GoTo from "$lib/components/ui/GoTo.svelte";
  import UserIcon from "$lib/components/Icons/UserIcon.svelte";
  import Edit from "$lib/components/Icons/Edit.svelte";
  import InputWithLabel from "$lib/components/ui/InputWithLabel.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { serverTimestamp } from "firebase/firestore";

  import { userStore } from "$lib/stores/store";
  import { dataHandlers } from "$lib/stores/store";
  import { showToast } from "$lib/components/func/toasts";

  let userData: App.UserEditFormData = {
    fullname: $userStore.currentUser?.fullname || "",
    username: $userStore.currentUser?.username || "",
    avatar: null,
    bio: $userStore.currentUser?.bio || "",
  };

  let files: FileList;
  let loading = false;
  let imageUrl: string | null = $userStore.currentUser?.photoUrl || null;
  const createFileUrl = () => {
    const selectedImage = files[0];
    userData.avatar = selectedImage;
    const url = URL.createObjectURL(selectedImage);
    imageUrl = url;
  };

  const handleSubmit = async () => {
    loading = true;
    const res = await dataHandlers.updateUserData(
      $userStore.currentUser?.uid || "",
      userData
    );
    if (res.success && res.data) {
      showToast("Profile Edited Successfully", "success");
      userStore.set({
        isUserLoading: false,
        currentUser: {
          username: res.data.updatedUserData.username,
          email: $userStore.currentUser?.email || "",
          createdAt: $userStore.currentUser?.createdAt || serverTimestamp(),
          uid: $userStore.currentUser?.uid || "",
          updatedAt: $userStore.currentUser?.updatedAt || serverTimestamp(),
          bio: res.data.updatedUserData.bio,
          friends: $userStore.currentUser?.friends,
          fullname: res.data.updatedUserData.fullname,
          photoUrl: res.data.updatedUserData.photoUrl,
          socialMedia: $userStore.currentUser?.socialMedia,
        },
      });
    } else {
      showToast("Something went Wrong", "error");
    }

    loading = false;
  };
</script>

<title>Edit Profile</title>
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
      <InputWithLabel
        type="text"
        bind:value={userData.fullname}
        label="Full Name"
        name="fullname"
        placeholder="Enter your full name..."
        icon="password"
        class="w-[80%]  mx-auto"
      />
      <InputWithLabel
        type="text"
        bind:value={userData.username}
        label="Username"
        name="username"
        placeholder="Enter your username..."
        icon="password"
        class="w-[80%]  mx-auto"
      />
      <InputWithLabel
        type="text"
        bind:value={userData.bio}
        label="Bio"
        name="bio"
        placeholder="Your bio..."
        icon="password"
        class="w-[80%]  mx-auto"
      />
    </div>
    <div>
      <Button
        isLoading={loading}
        class="px-14 bg-zinc-900 hover:bg-zinc-600"
        on:click={handleSubmit}>Submit</Button
      >
    </div>
  </div>
</section>
