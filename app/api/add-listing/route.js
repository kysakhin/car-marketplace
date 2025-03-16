export async function POST(req) {
  try {
    const data = await req.json();

    // TODO: Save data to database (MongoDB, Firebase, etc.)
    console.log("Received listing:", data);

    return new Response(JSON.stringify({ message: "Listing added!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error processing request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
