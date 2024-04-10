import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const formData = await request.json();
  console.log(formData);
  return json(
    {
      formData,
    },
    { status: 200 }
  );
}
