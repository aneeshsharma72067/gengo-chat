<script>
  import { slide, fade, blur, scale } from "svelte/transition";
  import GoBack from "$lib/components/ui/GoBack.svelte";
</script>

<section
  class="absolute z-50 min-h-screen min-w-full mx-auto bg-indigo-200 duration-300"
  transition:slide={{ axis: "x" }}
>
  Chat Page
</section>
