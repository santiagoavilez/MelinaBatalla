import type { APIRoute } from "astro";
const secret = import.meta.env.LEMON_API_KEY;
const code = import.meta.env.LEMON_SQUEEZY_DISCOUNT_CODE;

export const POST: APIRoute = async ({ request }) => {

    try {

        const body = await request.json();

        const { variant, bonus: $bonus } = body.data
        const customprice = variant !== 'default' ? 4400 : ($bonus ? 33200 : 30500)
        const discount_code = variant !== 'default' ? undefined : code
        const variant_id = variant === 'default' ? '307266' : '307268'
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
                        "checkout_options": {
                            embed: true,
                            "button_color": "#2DD272"
                        },
                        "checkout_data": {
                            discount_code,
                            "custom": {
                                "user_id": '123',
                                "bonus": $bonus ? 'true' : 'false',
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
        const url = data?.attributes?.url
        return Response.json({ url: url });


    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }

}
