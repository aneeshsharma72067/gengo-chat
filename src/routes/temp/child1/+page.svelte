<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import { temp, setTemp } from "../../../tempStore";
    let val:number;
    
</script>

<main>
  <p class="px-10 py-5 text-lg">{$temp}</p>
  <a href="/temp">Temp</a>
  <a href="/temp/child2">Child2</a>
  <input type="number" bind:value={val} />
  <Button
    on:click={() => {
      setTemp(val);
    }}
  >Set</Button>
</main>
