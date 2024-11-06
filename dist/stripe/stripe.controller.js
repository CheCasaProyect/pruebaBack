"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("./stripe.service");
const stripe_1 = __importDefault(require("stripe"));
const createPaymentDto_1 = require("../dtos/createPaymentDto");
let StripeController = class StripeController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async createPaymentIntent(amount) {
        return this.stripeService.createPaymentIntent(amount);
    }
    async handleWebhookEvent(req, res, signature) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
        let event;
        try {
            event = stripe_1.default.webhooks.constructEvent(req.body, signature, endpointSecret);
        }
        catch (err) {
            throw new common_1.BadRequestException('Webhook error: ${err.message}');
        }
        if (event.type === 'product.created' || event.type === 'product.updated') {
            const product = event.data.object;
        }
        return { received: true };
    }
    async createPayment(createPaymentDto) {
        const sessionurl = await this.stripeService.createCheckoutSession(createPaymentDto.stripePriceId);
        return { url: sessionurl };
    }
};
exports.StripeController = StripeController;
__decorate([
    (0, common_1.Post)('createPayment'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createPaymentIntent", null);
__decorate([
    (0, common_1.Post)('webhooks'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "handleWebhookEvent", null);
__decorate([
    (0, common_1.Post)('testingPayments'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPaymentDto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createPayment", null);
exports.StripeController = StripeController = __decorate([
    (0, common_1.Controller)('stripe'),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
//# sourceMappingURL=stripe.controller.js.map