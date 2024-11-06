import { StripeService } from './stripe.service';
import { Request, Response } from 'express';
import stripe from 'stripe';
import { CreatePaymentDto } from 'src/dtos/createPaymentDto';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createPaymentIntent(amount: number): Promise<stripe.Response<stripe.PaymentIntent>>;
    handleWebhookEvent(req: Request, res: Response, signature: string): Promise<{
        received: boolean;
    }>;
    createPayment(createPaymentDto: CreatePaymentDto): Promise<{
        url: string;
    }>;
}
