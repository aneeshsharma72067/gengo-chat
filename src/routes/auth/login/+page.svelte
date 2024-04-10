<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import SignInWithGoogle from "$lib/components/ui/GoogleAuth.svelte";
  import InputWithLabel from "$lib/components/ui/InputWithLabel.svelte";
  import Wave from "$lib/components/ui/Wave.svelte";

  type HTMLFormData = {
    email: string;
    password: string;
  };
  const formData: HTMLFormData = {
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

<div class="flex gap-10 md:w-3/5 h-full mx-auto items-center justify-center py-10">
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
      />
      <InputWithLabel
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password..."
        bind:value={formData.password}
      />
      <Button class="w-full my-2" on:click={hanldeSubmit}>Submit</Button>
      <p>Don't have an account ? <a href="/auth/signup">Sign Up</a></p>
    </div>
  </div>
  <div class="max-sm:hidden flex-1 h-full rounded-3xl overflow-hidden self-start bg-blue-100">
    <Wave />
  </div>
</div>
