<script>
  import { temp } from "../../tempStore";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  console.log('component is on page');
  onMount(() => {
    console.log('component mounted');
    if ($temp > 10) {
      console.log("Value is greater than 10");
      goto("/temp/greaterthanten");
    }
  });
  temp.subscribe((val) => {
    console.log("value changes to : ", val);
    if (val > 10) {
      console.log("Value is greater than 10");
      goto("/temp/greaterthanten");
    }
  });
</script>

<slot />
