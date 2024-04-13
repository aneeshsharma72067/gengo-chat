import { redirect } from "@sveltejs/kit";
import { userStore } from "../lib/stores/store";
import { checkAuth } from "$lib/firebase/user";

async function checkUserAuth() {
  console.log("calling checkAuth()");

  const res = await checkAuth();
  console.log("logging user from +layout.ts in root: ", res);
  return res;
}

export async function load({ url }) {
  const user = await checkUserAuth();
  let currentUser: App.User | any = user;
  userStore.set(currentUser);
  if (!currentUser) {
    if (!url.pathname.includes("login") && !url.pathname.includes("signup")) {
      throw redirect(302, "/auth/login");
    }
  } else {
    console.log(url.pathname, "User found, redirecting to app");
    if (
      url.pathname === "/" ||
      url.pathname.includes("login") ||
      url.pathname.includes("signup")
    ) {
      throw redirect(302, "/app");
    }
  }

  return;
}

export const ssr = false;
