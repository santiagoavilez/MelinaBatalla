import type { APIRoute } from "astro";

const secret = import.meta.env.LEMON_API_KEY;
const root = import.meta.env.LEMON_ROOT_VARIANT_ID;
const vercel_branch_url = import.meta.env.PUBLIC_VERCEL_URL;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const {
      variant,
      bonus: $bonus,
      userId,
    } = body.data as { variant: string; bonus: boolean; userId: string };
    const variant_id = root;

    console.log(
      variant,
      $bonus,
      userId,
      variant_id
    );
    console.log(body);
    console.log("import.meta.env:", vercel_branch_url);
    const req = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            product_options: {
              enabled_variants: [variant_id],
              redirect_url: `https://${vercel_branch_url}/cursos/root-program`,
            },
            checkout_options: {
              embed: true,
              button_color: "#E1A543",
              media: true,
              discount: true,
              desc: true,
            },
            checkout_data: {
              custom: {
                userId: userId ?? "123",
                bonus: $bonus ? "true" : "false",
                variant: variant === "default" ? "default" : "potenciador",
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: "77898",
              },
            },
            variant: {
              data: {
                type: "variants",
                id: variant_id,
              },
            },
          },
        },
      }),
    });
    const res = await req.json();
    const { data } = res;
    if (!data) {
      return Response.json(
        { message: "Server error", eror: res },
        { status: 500 }
      );
    }
    console.log(res.data.attributes);
    console.log(res.data.attributes.product_options);

    const url = data?.attributes?.url;
    return Response.json({ url: url });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Server error", eror: err },
      { status: 500 }
    );
  }
};
