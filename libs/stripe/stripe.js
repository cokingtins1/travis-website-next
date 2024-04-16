import Stripe from "stripe";

export function getStripe() {
	const stripe = new Stripe(
		env === "development"
			? process.env.STRIPE_SECRET_KEY
			: process.env.STRIPE_SECRET_KEY_PRODUCTION
	);

	return stripe;
}
