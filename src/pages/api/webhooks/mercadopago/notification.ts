import { createClerkClient } from "@clerk/clerk-sdk-node";
import type { APIRoute } from "astro"
import crypto from "crypto";
const secret = import.meta.env.MP_SECRET_KEY;
const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
const secretKey = import.meta.env.CLERK_SECRET_KEY
const vercel_url = import.meta.env.PUBLIC_VERCEL_URL

interface PaymentData {
    status: string;
    status_detail: string;
    metadata: {
        bonus: string;
        userId: string | null;
        variant: 'default' | 'secondary';
    }
    captured: boolean;
    payer: {
        email: string;
        first_name: string;
        last_name: string;
    }
    payment_type_id: string;
    card: {
        cardholder: {
            name: string;
        }
    }

}
export const POST: APIRoute = async ({ request }) => {

    try {

        const body = await request.json() as { action: string, type: string, data: { id: string }, id: string };
        // Check signature
        const signature = request.headers.get('x-signature')!;
        const requestId = request.headers.get('x-request-id')!;
        // Split the signature into an array of key-value pairs
        const pairs = signature.split(',');

        // Split each pair into a key and a value
        const ts = pairs[0].split('=')[1];
        const v1 = pairs[1].split('=')[1];

        if(!body.data){
            return Response.json({ message: "Webhook received" });
        }

        const { type, data: { id }, id: dataID, action } = body;
        const manifest = `id:${id};request-id:${requestId};ts:${ts};`;
        const hmac = crypto.createHmac('sha256', secret)
        const digest = Buffer.from(
            hmac.update(manifest).digest("hex"),
            "utf8"
        );

        const hashsignature = Buffer.from(v1 || "", "utf8");

        if (digest.length !== hashsignature.length) {
            throw new Error("Invalid signature length.");
        }

        if (!crypto.timingSafeEqual(hashsignature, digest)) {
            throw new Error("Invalid signature.");
        }

        if (type === 'payment' && !!id && action.startsWith('payment.')) {
            try {
                const responseCompra = await fetch(
                    `https://api.mercadopago.com/v1/payments/${id}`,
                    {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${import.meta.env.MP_ACCESS_TOKEN}`,
                        },
                    }
                );
                const paymentData = await responseCompra.json() as PaymentData

                const { status, status_detail } = paymentData;

                if (status === 'approved' && status_detail === 'accredited' && paymentData.captured) {
                    const { bonus, userId, variant } = paymentData.metadata;
                    const email = paymentData.payer.email;
                    let userName = 'Hermana'; // Default value

                    // Check if the payment was made with a card
                    if (paymentData.payment_type_id === 'credit_card' || paymentData.payment_type_id === 'debit_card') {
                        // Check if the cardholder's name is available
                        if (paymentData.card && paymentData.card.cardholder && paymentData.card.cardholder.name) {
                            userName = paymentData.card.cardholder.name;
                        }
                    }

                    // If the cardholder's name is not available, fall back to the payer's name
                    if (userName === 'Hermana' && paymentData.payer) {
                        userName = `${paymentData.payer.first_name ?? ''} ${paymentData.payer.last_name ?? ''}`.trim();
                    }


                    if ( variant === 'default') {
                        const clerk = createClerkClient({ apiKey: publishableKey, secretKey: secretKey })
                        // Create user in Clerk
                        try {
                            const invitation = await clerk.invitations.createInvitation({
                                emailAddress: email,
                                redirectUrl: `https://${vercel_url}/cursos/root-program`,
                                publicMetadata: {
                                    "bonus": bonus,
                                    "userName": userName,
                                },
                                ignoreExisting: true,
                            });
                            console.log(invitation);
                            return Response.json({ invitation: invitation });

                        }
                        catch (error) {
                            console.error(error)
                            return new Response(JSON.stringify({
                                error: error
                            }), {
                                status: 500,
                                statusText: 'create invitation error'
                            });
                        }

                    }
                    if(variant === 'secondary' && !!userId){
                        const clerk = createClerkClient({ apiKey: publishableKey, secretKey: secretKey })
                        // Create user in Clerk
                        try {
                            const user = await clerk.users.updateUserMetadata(userId, {
                                publicMetadata: {
                                    bonus: 'true',
                                }
                            })
                            return Response.json({ userPublicMetadata: user.publicMetadata });
                        }
                        catch (error) {
                            console.error(error)
                            return new Response(JSON.stringify({
                                error: error
                            }), {
                                status: 500,
                                statusText: 'update user metadata error'
                            });
                        }
                    }

                }
            } catch (error) {
                console.error(error);
                return new Response(JSON.stringify({
                    error: error
                }), {
                    status: 500,
                    statusText: 'get payment error'
                });
            }
        }

        return Response.json({ message: "Webhook received" });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error", error: err }, { status: 500 });
    }

}
