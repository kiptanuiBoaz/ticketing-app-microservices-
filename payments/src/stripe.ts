import Stripe from "stripe";

//creates a stripe instance to be used to charge customers
export const stripe = new Stripe(process.env.STRIPE_KEY!, {
    // @ts-ignore
    apiVersion: "2022-11-15",
});