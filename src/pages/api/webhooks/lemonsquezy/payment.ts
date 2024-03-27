import { createClerkClient } from "@clerk/clerk-sdk-node";
import type { APIRoute } from "astro"
import crypto from "crypto";
const secret = import.meta.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY

export const POST: APIRoute = async ({ request }) => {

    try {
        // Catch the event type
        const clonedReq =  request.clone();
        const eventType = request.headers.get("X-Event-Name");
        const body = await request.json();
        console.log(secret);
        // Check signature
        const requestBody = await clonedReq.text();

        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(
            hmac.update(requestBody).digest("hex"),
            "utf8"
        );
        console.log(hmac);
        const signature = Buffer.from(request.headers.get("X-Signature") || "", "utf8");
        console.log(digest);
        console.log(signature);

        if (digest.length !== signature.length) {
            throw new Error("Invalid signature length.");
        }

        if (!crypto.timingSafeEqual(digest, signature)) {
            throw new Error("Invalid signature.");
        }

        console.log(body);

        // Logic according to event
        if (eventType === "order_created") {
            const bonus = body.meta.custom_data.bonus;
            const emailAddress = body.data.attributes.user_email;
            const userName = body.data.attributes.user_name;
            const isSuccessful = body.data.attributes.status === "paid";

            if (isSuccessful) {
                const clerk = createClerkClient({ apiKey: publishableKey, secretKey: secretKey })
                clerk.signInTokens.createSignInToken
                // Create user in Clerk
                const invitation = await clerk.invitations.createInvitation({
                    emailAddress: emailAddress,
                    redirectUrl: 'https://2a60-181-230-166-180.ngrok-free.app/cursos/root-program',
                    publicMetadata: {
                        "bonus": bonus,
                        "userName": userName,
                    },
                    ignoreExisting: true,
                });



                console.log(invitation);

            }
        }




        return Response.json({ message: "Webhook received" });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }

}
