"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarpiBotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const carpiBot_entity_1 = require("../entities/carpiBot.entity");
const carpibot_gateway_1 = require("./carpibot.gateway");
const carpibot_service_1 = require("./carpibot.service");
let CarpiBotModule = class CarpiBotModule {
};
exports.CarpiBotModule = CarpiBotModule;
exports.CarpiBotModule = CarpiBotModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, carpiBot_entity_1.CarpiBot])],
        controllers: [],
        providers: [carpibot_gateway_1.CarpiChatGateway, carpibot_service_1.CarpibotService],
    })
], CarpiBotModule);
//# sourceMappingURL=carpibot.module.js.map