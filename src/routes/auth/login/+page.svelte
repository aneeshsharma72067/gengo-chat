<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import SignInWithGoogle from "$lib/components/ui/GoogleAuth.svelte";
  import InputWithLabel from "$lib/components/ui/InputWithLabel.svelte";
  import Wave from "$lib/components/ui/Wave.svelte";
  import { authHandlers, userStore } from "$lib/stores/store";
  import { goto } from "$app/navigation";
  import { showToast } from "$lib/components/func/toasts";

  if ($userStore.currentUser! && $userStore.isUserLoading) {
    goto("/app");
  }
  type UserLoginData = {
    email: string;
    password: string;
  };
  const formData: UserLoginData = {
    email: "",
    password: "",
  };
  let emailError: string = "";
  let passwordError: string = "";
  let isLoading: boolean = false;

  const hanldeSubmit = async () => {
    isLoading = true;
    if (!formData.email) {
      emailError = "Email is Required";
    }
    if (!formData.password) {
      passwordError = "Password is Required";
    }
    if (formData.password.length < 6) {
      passwordError = "Password should contain at least 6 characters";
    }
    if (!formData.email || formData.password.length < 6) {
      isLoading = false;
      return;
    }
    const res = await authHandlers.login(formData);
    if (res.success) {
      userStore.set({
        isUserLoading: false,
        currentUser: res.userData as App.User,
      });
      showToast("Logged In Successfully", "success");
      isLoading = false;
      goto("/app");
      return;
    }
    isLoading = false;
    if (res.error?.includes("invalid-credential")) {
      showToast("Invalid Credentials !!", "error");
      return;
    }
    showToast("Something went wrong !!", "error");
  };
</script>

<title>Login</title>

<div
  class="flex gap-10 md:w-3/5 h-full mx-auto md:items-center justify-center py-16"
>
  <div class="flex md:flex-1 flex-col gap-1 items-center w-4/5 md:w-2/5">
    <div class="flex items-center justify-center my-1">
      <img src="/logo.png" alt="Logo" class="max-w-24" />
    </div>
    <h1 class="text-[1.7rem] font-medium">Welcome Back</h1>
    <p>Enter your details to sign in</p>

    <div class="flex flex-col gap-4 w-full my-3 items-center">
      <InputWithLabel
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your Email..."
        bind:value={formData.email}
        error={formData.email === "" ? emailError : ""}
      />
      <InputWithLabel
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password..."
        bind:value={formData.password}
        error={formData.password.length < 6 ? passwordError : ""}
      />
      <Button class="w-full my-2" on:click={hanldeSubmit} {isLoading}
        >Submit</Button
      >
      <p>Don't have an account ? <a href="/auth/signup">Sign Up</a></p>
    </div>
  </div>
  <div
    class="max-sm:hidden flex-1 h-full rounded-3xl overflow-hidden self-start bg-blue-100"
  >
    <Wave />
  </div>
</div>
