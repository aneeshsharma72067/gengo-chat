<script lang="ts">
  import Google from "../Icons/Google.svelte";
  export let authType:string;
  $: method = authType === 'signin' ? "Sign In" : "Sign Up"
</script>

<button
  class="flex items-center justify-center gap-2 my-4 border-2 rounded-md px-6 py-2 text-slate-500 w-full bg-white"
>
  <span>{method} with Google</span>
  <Google />
</button>
