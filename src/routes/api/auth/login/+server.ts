import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const formData = await request.json();
  console.log(formData);

  const response = {
    success: formData.email !== "" && formData.password !== "",
  };
  return json(response);
}

export async function GET({ request }) {
  return json({
    message: "Login API route",
  });
}
