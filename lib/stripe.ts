import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

export const STRIPE_PRICE_ID = "price_1TMt7JHvopBRnTFP8rTWsCYn";
export const REPORT_PRICE = 900; // $9.00 in cents
