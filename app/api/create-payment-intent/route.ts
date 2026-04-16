import { NextResponse } from "next/server";
import { getStripe, STRIPE_PRICE_ID } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST() {
  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
    };

    // @ts-expect-error - Stripe SDK types lag behind API; embedded mode is supported
    params.ui_mode = "embedded";
    params.redirect_on_completion = "never";

    const session = await getStripe().checkout.sessions.create(params);

    return NextResponse.json({
      clientSecret: session.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
