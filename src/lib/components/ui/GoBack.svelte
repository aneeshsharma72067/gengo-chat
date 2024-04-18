<script>
  import ChevronBack from "$lib/components/Icons/ChevronBack.svelte";
  export let to = "";
</script>

<a
  href={to}
  class="absolute z-30 top-5 left-5 flex gap-1 duration-300 items-center justify-center rounded-full bg-white px-3 py-1 hover:bg-slate-200 cursor-pointer"
>
  <span><ChevronBack size={20} strokecolor="black" /></span>
  <span class="text-slate-700">Back</span>
</a>
