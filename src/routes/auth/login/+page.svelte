<script>
  import Button from "$lib/components/Button.svelte";
  import SignInWithGoogle from "$lib/components/SignInWithGoogle.svelte";
  import InputWithLabel from "$lib/components/InputWithLabel.svelte";
  const formData = {
    email: "",
    password: "",
  };
  console.log(formData);
</script>

<title>Login</title>

<div class="flex items-center justify-center py-10">
  <div class="flex flex-col gap-1 items-center w-3/5">
    <div class="flex items-center justify-center my-1">
      <div class="w-14 h-14 bg-red-400 rounded-full"></div>
    </div>
    <h1 class="text-[1.7rem] font-medium">Welcome Back</h1>
    <p>Enter your details to sign in</p>
    <SignInWithGoogle />
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
      />
      <InputWithLabel
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password..."
        bind:value={formData.password}
      />
      <Button class="w-full my-2">Submit</Button>
      <p>Don't have an account ? <a href="/auth/signup">Sign Up</a></p>
    </div>
  </div>
</div>
