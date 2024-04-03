import type { APIRoute } from "astro";
const accestoken = import.meta.env.MP_ACCESS_TOKEN

export const POST: APIRoute = async ({ request }) => {
    try {
        console.log('accestoken', accestoken);
        const body  = await request.json();
        const res = await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Idempotency-Key': body.token,
                Authorization: `Bearer ${accestoken}`,
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            return new Response(JSON.stringify({
                error: data
            }), {
                status: 500,
                statusText: 'server error'
            });
        }

        return Response.json( data );
    } catch (error) {
        console.log('error',error);
        return new Response(JSON.stringify({
            error: error
        }), {
            status: 500,
            statusText: 'server error'
        });
    }
};