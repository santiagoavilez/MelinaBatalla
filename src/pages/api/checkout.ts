import type { APIRoute } from "astro";
const secret = import.meta.env.LEMON_API_KEY;

export const POST: APIRoute = async ({ request }) => {

    try {

        const body = await request.json();

        console.log(body);
        const req = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secret}`
            },
            body: JSON.stringify(body)
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
