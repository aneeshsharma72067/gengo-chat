<script>
  import Button from "$lib/components/ui/Button.svelte";
  import { temp } from "../../../tempStore";
</script>

<main>
  <p class="px-10 py-5 text-lg">{$temp}</p>
  <a href="/temp">Temp</a>
  <a href="/temp/child1">Child2</a>
</main>
