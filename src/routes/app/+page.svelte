<script>
  import { userStore } from "$lib/stores/user";
  userStore.subscribe(data => {
    console.log(data);
  })
</script>

<div>{$userStore?.username}</div>
