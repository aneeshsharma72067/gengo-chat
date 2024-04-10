<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import SignInWithGoogle from "$lib/components/ui/SignInWithGoogle.svelte";
  import InputWithLabel from "$lib/components/ui/InputWithLabel.svelte";

  type LoginFormData = {
    email: string;
    password: string;
  };
  const formData: LoginFormData = {
    email: "",
    password: "",
  };
  const hanldeSubmit = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };
</script>

<title>Login</title>

<div class="flex items-center justify-center py-10">
  <div class="flex flex-col gap-1 items-center w-4/5 md:w-2/5">
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
      <form action="" class="flex flex-col gap-4 w-full items-center">
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
        <Button class="w-full my-2" on:click={hanldeSubmit}>Submit</Button>
      </form>
      <p>Don't have an account ? <a href="/auth/signup">Sign Up</a></p>
    </div>
  </div>
</div>
