import Stripe from 'stripe';
export declare class StripeService {
    private readonly stripe;
    constructor(stripe: Stripe);
    createPaymentIntent(amount: number, currency?: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    createCheckoutSession(stripePriceId: string): Promise<string>;
}
