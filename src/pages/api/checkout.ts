import type { APIRoute } from "astro";
const secret = import.meta.env.LEMON_API_KEY;

export const POST: APIRoute = async ({ request }) => {

    try {

        const body = await request.json();
        const $bonus = body.bonus;
        console.log('bonus:', $bonus);
        const bodyData = {
            data: {
                "type": "checkouts",
                "attributes": {
                    'custom_price': $bonus ? 33200 : 28800,
                    "checkout_options": {
                        embed: true,
                        "button_color": "#2DD272"
                    },
                    "checkout_data": {
                        'discount_code': $bonus ? 'E1NZEXMW' : 'EWOTQZMW',
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
                            "id": "76058"
                        }
                    },
                    "variant": {
                        "data": {
                            "type": "variants",
                            "id": "307170"
                        },
                    }
                }
            }
        }
        const req = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secret}`
            },
            body: JSON.stringify(bodyData)
        })
        const res = await req.json()
        const {data} = res
        console.log(res)
        const url = data?.attributes?.url
        return Response.json({ url: url });
           // fetch('https://api.lemonsqueezy.com/v1/checkouts', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${secret}`
        //     },
        //     body: JSON.stringify({
        //         data: {
        //             "type": "checkouts",
        //             "attributes": {
        //                 'custom_price': $bonus ? 33200 : 28800,
        //                 "checkout_options": {
        //                     embed: true,
        //                     "button_color": "#2DD272"
        //                 },
        //                 "checkout_data": {
        //                     'discount_code': $bonus ? 'E1NZEXMW' : 'EWOTQZMW',
        //                     "custom": {
        //                         "user_id": '123',
        //                         "bonus": $bonus ? 'true' : 'false',
        //                     },
        //                 },
        //             },
        //             "relationships": {
        //                 "store": {
        //                     "data": {
        //                         "type": "stores",
        //                         "id": "76058"
        //                     }
        //                 },
        //                 "variant": {
        //                     "data": {
        //                         "type": "variants",
        //                         "id": "307170"
        //                     },
        //                 }
        //             }
        //         }
        //     })
        // })
        //     .then(response => response.json())
        //     .then((response) => {
        //         console.log('data:', response);
        //         const url = response?.data?.attributes.url;
        //         if (url) {
        //             window.LemonSqueezy.Url.Open(url);
        //         }

        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });







    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }

}
