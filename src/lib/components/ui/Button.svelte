<script lang="ts">
  export let isLoading:boolean = false;
  import Loader from '$lib/components/ui/Loader.svelte'
</script>

<button
disabled={isLoading}
  class="{$$restProps.class} bg-blue-900 text-white px-6 py-3 rounded-md mx-10 flex items-center justify-center gap-3 disabled:bg-blue-950 duration-300"
  on:click
>
  <slot />
  {#if isLoading}
    <Loader/>
  {/if}
</button>
