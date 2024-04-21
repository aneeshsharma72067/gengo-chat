<script lang="ts">
  export let message: App.Message;

  import { userStore } from "$lib/stores/store";
  import { chatStore } from "$lib/stores/chatStore";

  const messageIsSentByUser = message.sendersId === $userStore.currentUser?.uid;

  const className = `max-w-[60%] min-w-10 bg-indigo-400 min-h-10 duration-200 px-4 py-3 rounded-3xl text-white flex flex-col gap-1 ${messageIsSentByUser ? "message-on-right" : "message-on-left"}`;
</script>

<div class={className}>
  {#if !messageIsSentByUser}
    <span class="text-slate-200 text-sm"
      >{$chatStore.chattingWith?.username}</span
    >
  {/if}
  <p class="">{message.content}</p>
</div>

<style>
  .message-on-left {
    align-self: flex-start;
    border-bottom-left-radius: 0;
  }
  .message-on-right {
    align-self: flex-end;
    border-bottom-right-radius: 0;
  }
</style>
