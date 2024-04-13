<script>
  import { ToastContainer, BootstrapToast } from "svelte-toasts";
</script>

<ToastContainer placement="top-right" let:data>
  <div class="bg-white duration-1000 rounded-md">
    <BootstrapToast {data} />
  </div>
</ToastContainer>
