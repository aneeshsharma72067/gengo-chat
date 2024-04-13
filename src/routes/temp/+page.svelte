<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import { temp, setTemp } from "../../tempStore";

  let val: number;
</script>

<main>
  <Button
    on:click={() => {
      $temp++;
    }}>Increment</Button
  >
  <input type="number" bind:value={val} />
  <Button
    on:click={() => {
      setTemp(val);
    }}
  >
    Set
  </Button>
  <p class="px-10 py-5 text-lg">{$temp}</p>
  <div>
    <a href="/temp/child1">Child1</a>
    <a href="/temp/child2">Child2</a>
  </div>
</main>
