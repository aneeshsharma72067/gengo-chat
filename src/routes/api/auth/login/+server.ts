import { loginUser } from "$lib/firebase/user.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const formData = await request.json();

  const response = await loginUser(formData);
  return json(response);
}
export async function GET({ request }) {
  return json({
    message: "SignUp API route",
  });
}
