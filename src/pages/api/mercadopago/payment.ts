import type { APIRoute } from "astro";
const accestoken = import.meta.env.MP_ACCESS_TOKEN
import { v4 as uuidv4 } from 'uuid';

export const POST: APIRoute = async ({ request }) => {
    try {
        const IdempotencyKey = uuidv4();
        const body  = await request.json();
        const res = await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Idempotency-Key': IdempotencyKey,
                Authorization: `Bearer ${accestoken}`,
            },
            body: JSON.stringify(body),
        });
        console.log("res", res);

        const data = await res.json();
        console.log('data',data);
        if (!res.ok) {
            console.log('res',data);
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