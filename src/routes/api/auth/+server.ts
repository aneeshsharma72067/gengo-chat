import { checkAuth } from "$lib/firebase/user.js";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
  const user = await checkAuth();
  console.log("logging user from +server.ts in auth : ",user);
  return json(user);
}

// export async function POST({ request }) {}
