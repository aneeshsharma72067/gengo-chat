import { redirect } from "@sveltejs/kit";
import { userStore } from "$lib/stores/user.js";

export async function load({ url }) {
  let currentUser: App.User | null = null;
  userStore.subscribe((user) => {
    currentUser = user;
  });
  if (
    !currentUser &&
    !url.pathname.includes("login") &&
    !url.pathname.includes("signup")
  ) {
    throw redirect(302, "/auth/login");
  }

  return;
}
