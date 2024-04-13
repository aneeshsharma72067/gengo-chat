import { json } from "@sveltejs/kit";
import { logout } from "$lib/firebase/user";

export async function GET() {
  await logout();
  return json("Logged out successfully");
}
