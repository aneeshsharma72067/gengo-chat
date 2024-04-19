<script>
  import Message from "./Message.svelte";
</script>

<div class="w-full h-[75vh] overflow-y-scroll flex items-start justify-center">
  <div class="w-full flex flex-col px-3 gap-3">
    <Message align="right" />
    <Message />
    <Message align="right" />
    <Message />
  </div>
</div>
