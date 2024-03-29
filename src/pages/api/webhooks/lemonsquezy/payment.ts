import { createClerkClient } from "@clerk/clerk-sdk-node";
import type { APIRoute } from "astro"
import crypto from "crypto";
const secret = import.meta.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY
const vercel_branch_url = import.meta.env.PUBLIC_VERCEL_URL

export const POST: APIRoute = async ({ request }) => {

    try {
        // Catch the event type
        const clonedReq = request.clone();
        const eventType = request.headers.get("X-Event-Name");
        const body = await request.json();
        // Check signature
        console.log(vercel_branch_url)

        const requestBody = await clonedReq.text();

        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(
            hmac.update(requestBody).digest("hex"),
            "utf8"
        );
        const signature = Buffer.from(request.headers.get("X-Signature") || "", "utf8");

        if (digest.length !== signature.length) {
            throw new Error("Invalid signature length.");
        }

        if (!crypto.timingSafeEqual(digest, signature)) {
            throw new Error("Invalid signature.");
        }

        // Logic according to event
        if (eventType === "order_created") {
            const bonus = body.meta.custom_data.bonus;
            const emailAddress = body.data.attributes.user_email;
            const userName = body.data.attributes.user_name;
            const userId = body.meta.custom_data.userId as string;
            const isSuccessful = body.data.attributes.status === "paid";
            const isPotenciador = body.meta.custom_data.variant === "potenciador";
            if (isSuccessful) {
                const clerk = createClerkClient({ apiKey: publishableKey, secretKey: secretKey })
                // Create user in Clerk
                console.log('Creating user in Clerk')
                console.log(userId)
                console.log(body.meta.custom_data.variant)
                if (isPotenciador) {

                    const user = await clerk.users.updateUserMetadata(userId, {
                        publicMetadata: {
                            bonus: 'true',
                        }
                    })
                    return Response.json({ userPublicMetadata: user.publicMetadata });
                }
                const invitation = await clerk.invitations.createInvitation({
                    emailAddress: emailAddress,
                    redirectUrl: `https://${vercel_branch_url}/cursos/root-program`,
                    publicMetadata: {
                        "bonus": bonus,
                        "userName": userName,
                    },
                    ignoreExisting: true,
                });
                console.log(invitation);
                return Response.json({ invitation: invitation });
            }
        }




        return Response.json({ message: "Webhook received" });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error", error: err }, { status: 500 });
    }

}
