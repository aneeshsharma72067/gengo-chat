<script lang="ts">
  export let align: "left" | "right" = "left";
</script>

<div
  class={`max-w-[60%] min-w-10 bg-indigo-400 min-h-10 duration-200 px-4 py-3 rounded-3xl text-white self-${align === "left" ? "start rounded-bl-none" : "end rounded-br-none"} flex flex-col gap-1 `}
>
  <span class="text-slate-200 text-sm">User</span>
  <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</div>
