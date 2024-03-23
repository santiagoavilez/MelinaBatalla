import clerkClient, { createClerkClient } from '@clerk/clerk-sdk-node'
import type { APIRoute } from 'astro'
const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;
const secretKey = import.meta.env.CLERK_SECRET_KEY;
const clerk = createClerkClient({
    publishableKey: publishableKey,
    secretKey: secretKey,
});
export const GET: APIRoute = ({ request, redirect }) => {
    console.log('request', request.headers.get("cookie"))
    const userId = request.headers.get("cookie")?.split("userId=")[1].split(";")[0]!;






    return new Response(
        JSON.stringify({
            grettings: 'hola',
        }),
    )
}

