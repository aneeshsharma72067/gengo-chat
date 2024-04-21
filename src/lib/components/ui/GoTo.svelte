<script lang="ts">
  import ChevronBack from "$lib/components/Icons/ChevronBack.svelte";
  import Edit from "../Icons/Edit.svelte";
  export let to = "";
  export let value = "";
  export let icon: "back" | "edit" = "back";
</script>

<a
  href={to}
  class="relative z-30 w-max flex gap-1 duration-300 items-center justify-center rounded-full bg-white px-3 py-1 hover:bg-slate-200 cursor-pointer"
>
  <span>
    {#if icon === "back"}
      <ChevronBack size={20} strokecolor="black" />
    {:else if icon === "edit"}
      <Edit size={25} />
    {/if}
  </span>
  <span class="text-slate-700">{value}</span>
</a>
