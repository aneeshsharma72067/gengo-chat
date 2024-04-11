<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import SignInWithGoogle from "$lib/components/ui/GoogleAuth.svelte";
  import InputWithLabel from "$lib/components/ui/InputWithLabel.svelte";
  import Wave from "$lib/components/ui/Wave.svelte";
  import { _hanldeSignup } from "./+page";
  import { userStore } from "$lib/stores/user";

  type UserSignupData = {
    email: string;
    password: string;
    username: string;
  };
  let formData: UserSignupData = {
    email: "",
    password: "",
    username: "",
  };
  let emailError: string = "";
  let passwordError: string = "";
  let userNameError: string = "";
  let isLoading: boolean = false;

  const hanldeSubmit = async () => {
    isLoading = true;
    if (!formData.username) {
      userNameError = "Username is Required";
    }
    if (!formData.email) {
      emailError = "Email is Required";
    }
    if (!formData.password) {
      passwordError = "Password is Required";
    }
    if (formData.password.length < 6) {
      passwordError = "Password should contain at least 6 characters";
    }
    if (
      !formData.email ||
      !formData.password ||
      !formData.username ||
      formData.password.length < 6
    ) {
      isLoading = false;
      return;
    }
    const res = await _hanldeSignup(formData);
    if (!res.response.success) {
      isLoading = false;
      // throw new Error(response.error);
      console.log(res.response.error);
      return;
    }
    console.log(res.response.user);
    formData = {
      email: "",
      password: "",
      username: "",
    };
    isLoading = false;
    userStore.set(res.response.userData);
    userStore.subscribe((val) => {
      console.log(val);
    });
  };
</script>

<title>SignUp</title>

<div
  class="flex gap-10 md:w-3/5 h-full mx-auto md:items-center justify-center py-20"
>
  <div class="flex md:flex-1 flex-col gap-1 items-center w-4/5 md:w-2/5">
    <h1 class="text-[1.7rem] font-bold text-slate-600 text-center">
      Register now to get started
    </h1>
    <p class="">Enter your details to sign up</p>
    <SignInWithGoogle authType="signup" />
    <div class="flex w-full items-center justify-center gap-5">
      <hr class="border-slate-300 w-full" />
      <span>OR</span>
      <hr class="border-slate-300 w-full" />
    </div>
    <div class="flex flex-col gap-4 w-full items-center">
      <InputWithLabel
        name="username"
        type="text"
        label="Username"
        placeholder="Enter a username..."
        bind:value={formData.username}
        error={formData.username === "" ? userNameError : ""}
      />
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
      <p>Already have an account ? <a href="/auth/login">Login</a></p>
    </div>
  </div>
  <div
    class="max-sm:hidden flex-1 h-full rounded-3xl overflow-hidden self-start bg-blue-100"
  >
    <Wave />
  </div>
</div>
