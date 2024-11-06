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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarpiBot = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const swagger_1 = require("@nestjs/swagger");
let CarpiBot = class CarpiBot {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => String }, username: { required: true, type: () => String }, chat: { required: true, type: () => String }, userId: { required: true, type: () => String }, createdAt: { required: false, type: () => Date } };
    }
};
exports.CarpiBot = CarpiBot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CarpiBot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({
        description: 'Username',
    }),
    __metadata("design:type", String)
], CarpiBot.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, swagger_1.ApiProperty)({
        description: 'Message',
    }),
    __metadata("design:type", String)
], CarpiBot.prototype, "chat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.reviews),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CarpiBot.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    (0, swagger_1.ApiProperty)({
        description: 'Created at',
    }),
    __metadata("design:type", Date)
], CarpiBot.prototype, "createdAt", void 0);
exports.CarpiBot = CarpiBot = __decorate([
    (0, typeorm_1.Entity)({
        name: 'carpiBot',
    })
], CarpiBot);
//# sourceMappingURL=carpiBot.entity.js.map