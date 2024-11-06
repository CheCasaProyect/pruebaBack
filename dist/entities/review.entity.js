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
exports.Review = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const property_entity_1 = require("./property.entity");
const swagger_1 = require("@nestjs/swagger");
let Review = class Review {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, user: { required: true, type: () => require("./users.entity").User }, property: { required: true, type: () => require("./property.entity").Property }, reviewDate: { required: true, type: () => Date }, comment: { required: true, type: () => String }, rating: { required: true, type: () => Number } };
    }
};
exports.Review = Review;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(`uuid`),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.reviews),
    (0, typeorm_1.JoinColumn)({ name: `user_id` }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", users_entity_1.User)
], Review.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, (property) => property.reviews),
    (0, typeorm_1.JoinColumn)({ name: `property_id` }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", property_entity_1.Property)
], Review.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Review.prototype, "reviewDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 350,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)({
        name: `reviews`,
    })
], Review);
//# sourceMappingURL=review.entity.js.map