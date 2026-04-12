import { NextResponse } from "next/server";
import { getStripe, REPORT_PRICE } from "@/lib/stripe";

export async function POST() {
  try {
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: REPORT_PRICE,
      currency: "usd",
      metadata: {
        product: "pro_report",
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
