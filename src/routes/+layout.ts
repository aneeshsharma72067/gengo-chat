import { redirect } from "@sveltejs/kit";
import { userStore } from "../lib/stores/store";

async function checkAuth() {
  const res = await fetch("/api/auth", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);

  return data;
}

export async function load({ url }) {
  const user = await checkAuth();
  let currentUser: App.User | null = user;
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
