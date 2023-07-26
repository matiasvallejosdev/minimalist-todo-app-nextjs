
export function GET() {
    return new Response(JSON.stringify({message: "Hello World! Minimalist API!"}), {
        headers: {
            "content-type": "application/json",
        }
    });
}