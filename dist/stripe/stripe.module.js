"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeModule = void 0;
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
const stripe_service_1 = require("./stripe.service");
const stripe_controller_1 = require("./stripe.controller");
const stripe_1 = __importDefault(require("stripe"));
(0, dotenv_1.config)({ path: '.env' });
let StripeModule = class StripeModule {
};
exports.StripeModule = StripeModule;
exports.StripeModule = StripeModule = __decorate([
    (0, common_1.Module)({
        providers: [
            stripe_service_1.StripeService,
            {
                provide: 'STRIPE_CLIENT',
                useFactory: () => new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
                    apiVersion: '2024-09-30.acacia',
                }),
            },
        ],
        controllers: [stripe_controller_1.StripeController],
    })
], StripeModule);
//# sourceMappingURL=stripe.module.js.map