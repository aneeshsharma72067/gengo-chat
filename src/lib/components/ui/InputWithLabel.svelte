<script lang="ts">
  export let label: string;
  export let name: string;
  export let type: string;
  export const icon: string = "mail" || "password";
  export let placeholder: string;
  export let value: string;
  export let error: string = "";
</script>

<div class="w-full flex flex-col gap-4">
  <label for={name}>{label}</label>
  {#if type === "email"}
    <input
      type="email"
      bind:value
      {name}
      class="{$$restProps.class} px-5 py-2 rounded-md outline-none"
      {placeholder}
    />
  {:else if type === "password"}
    <input
      type="password"
      bind:value
      {name}
      class="{$$restProps.class} px-5 py-2 rounded-md outline-none"
      {placeholder}
    />
  {:else if type === "text"}
    <input
      type="text"
      bind:value
      {name}
      class="{$$restProps.class} px-5 py-2 rounded-md outline-none"
      {placeholder}
    />
  {/if}
  {#if error}
    <small class="text-red-400">{error}</small>
  {/if}
</div>
