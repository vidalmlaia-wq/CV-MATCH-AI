import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
})

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    priceId: null,
    limits: {
      resumes: 2,
      analyses: 3,
      coverLetters: 2,
    },
  },
  pro: {
    name: "Pro",
    price: 12,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    limits: {
      resumes: Infinity,
      analyses: Infinity,
      coverLetters: Infinity,
    },
  },
}
