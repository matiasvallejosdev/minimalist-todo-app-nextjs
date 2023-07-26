
export function GET() {
    return new Response(JSON.stringify({message: "URL Connection Successful"}), {
        headers: {
            "content-type": "application/json",
        }
    });
}