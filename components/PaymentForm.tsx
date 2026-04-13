"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message || "Payment failed");
      setLoading(false);
    } else if (result.paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-6 w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </>
        ) : (
          "Pay $19 — Get Pro Report"
        )}
      </button>
    </form>
  );
}

export default function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/create-payment-intent", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(console.error);
  }, []);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-8">
        <svg
          className="animate-spin w-8 h-8 text-red-500"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#ef4444",
            colorBackground: "#1a1a1a",
            colorText: "#ededed",
            borderRadius: "12px",
          },
        },
      }}
    >
      <CheckoutForm onSuccess={onSuccess} />
    </Elements>
  );
}
