import type { APIRoute } from "astro";
const accestoken = import.meta.env.MP_ACCESS_TOKEN

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const res = await fetch(`https://api.mercadopago.com/checkout/preferences`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accestoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            error: error
        }), {
            status: 500,
            statusText: 'server error'
        });
    }
};