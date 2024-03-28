import type { APIRoute } from "astro";

const secret = import.meta.env.LEMON_API_KEY;
const code = import.meta.env.LEMON_SQUEEZY_DISCOUNT_CODE;
const potenciador = import.meta.env.LEMON_POTENCIADOR_VARIANT_ID;
const root = import.meta.env.LEMON_ROOT_VARIANT_ID;

export const POST: APIRoute = async ({ request }) => {

    try {

        const body = await request.json();

        const { variant, bonus: $bonus, userId } = body.data as { variant: string, bonus: boolean, userId: string}
        const customprice = variant !== 'default' ? 4400 : ($bonus ? 33200 : 30500)
        const discount_code = variant !== 'default' ? undefined : code
        const variant_id = variant === 'default' ? root : potenciador

        console.log(variant, $bonus, userId, customprice, discount_code, variant_id)
        console.log(body);

        const req = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secret}`
            },
            body: JSON.stringify({
                data: {
                    "type": "checkouts",
                    "attributes": {
                        'custom_price': customprice,
                         "product_options": {
                             "enabled_variants": [
                                 variant_id,

                             ],
                             redirect_url: `${import.meta.env.VERCEL_BRANCH_URL}/cursos/root-program`,
                         },
                        "checkout_options": {
                            embed: true,
                            "button_color": "#E1A543",
                            "media": true,
                            "discount": true,
                            "desc" : true

                        },
                        "checkout_data": {
                            discount_code,
                            "custom": {
                                "userId": userId,
                                "bonus": $bonus ? 'true' : 'false',
                                "variant": variant === 'default' ? 'default' : "potenciador",

                            },
                        },
                    },
                    "relationships": {
                        "store": {
                            "data": {
                                "type": "stores",
                                "id": "77898"
                            }
                        },
                        "variant": {
                            "data": {
                                "type": "variants",
                                "id": variant_id
                            },
                        }
                    }
                }
            })
        })
        const res = await req.json()
        const {data} = res
        console.log(res)
        if (!data) {
            return Response.json({ message: "Server error", eror: res }, { status: 500 });
        }
        const url = data?.attributes?.url
        return Response.json({ url: url });


    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error", eror: err }, { status: 500 });
    }

}
