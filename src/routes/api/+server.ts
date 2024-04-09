export function GET({ url }) {
  console.log(url.pathname);

  return new Response(
    JSON.stringify({
      message: "hello",
    })
  );
}
