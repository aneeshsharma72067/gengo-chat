<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import SignInWithGoogle from "$lib/components/ui/GoogleAuth.svelte";
  import InputWithLabel from "$lib/components/ui/InputWithLabel.svelte";
  import Wave from "$lib/components/ui/Wave.svelte";
  import { _hanldeLogin } from "./+page";
  import { userStore } from "$lib/stores/user";

  type HTMLFormData = {
    email: string;
    password: string;
  };
  const formData: HTMLFormData = {
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
    const res = await _hanldeLogin(formData);
    userStore.set(res.response.userData);
    isLoading = false;
    console.log(res);
  };
</script>

<title>Login</title>

<div
  class="flex gap-10 md:w-3/5 h-full mx-auto md:items-center justify-center py-16"
>
  <div class="flex md:flex-1 flex-col gap-1 items-center w-4/5 md:w-2/5">
    <div class="flex items-center justify-center my-1">
      <div class="w-14 h-14 bg-red-400 rounded-full"></div>
    </div>
    <h1 class="text-[1.7rem] font-medium">Welcome Back</h1>
    <p>Enter your details to sign in</p>
    <SignInWithGoogle authType="signin" />
    <div class="flex w-full items-center justify-center gap-5">
      <hr class="border-slate-300 w-full" />
      <span>OR</span>
      <hr class="border-slate-300 w-full" />
    </div>
    <div class="flex flex-col gap-4 w-full items-center">
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
        error={formData.password.length <= 6 ? passwordError : ""}
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
