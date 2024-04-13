import { toasts } from "svelte-toasts";
import type { ToastType } from "svelte-toasts/types/common";

export const showToast = (description: string, type: ToastType) => {
  const toast = toasts.add({
    description: description,
    duration: 4000,
    placement: "top-right",
    type: type,
    theme: "light",
    onClick: () => {
      console.log("toast clicked");
    },
  });
};
