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
exports.Property = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const review_entity_1 = require("./review.entity");
const swagger_1 = require("@nestjs/swagger");
const reservationDetail_entity_1 = require("./reservationDetail.entity");
let Property = class Property {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, owner: { required: true, type: () => require("./users.entity").User }, active: { required: true, type: () => Boolean }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, street: { required: true, type: () => String }, number: { required: true, type: () => Number }, postalCode: { required: true, type: () => String }, state: { required: true, type: () => String }, city: { required: true, type: () => String }, price: { required: true, type: () => Number }, bedrooms: { required: true, type: () => Number }, bathrooms: { required: true, type: () => Number }, isAvailable: { required: true, type: () => Boolean }, capacity: { required: true, type: () => Number }, photos: { required: true, type: () => [String] }, stripeProductId: { required: true, type: () => String }, stripePriceId: { required: true, type: () => String }, latitude: { required: false, type: () => Number }, longitude: { required: false, type: () => Number }, reviews: { required: true, type: () => [require("./review.entity").Review] }, reservationDetail: { required: true, type: () => require("./reservationDetail.entity").ReservationDetail } };
    }
};
exports.Property = Property;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({
        description: 'Property id',
        format: 'uuid',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], Property.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.properties),
    (0, typeorm_1.JoinColumn)({ name: "owner_id" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", users_entity_1.User)
], Property.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], Property.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Property.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Property.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Property.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Property.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Property.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Property.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Property.prototype, "bedrooms", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Property.prototype, "bathrooms", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], Property.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Property.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        array: true,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], Property.prototype, "photos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "stripeProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "stripePriceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Property.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Property.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.property, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], Property.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => reservationDetail_entity_1.ReservationDetail, (reservationDetail) => reservationDetail.property, { onDelete: 'CASCADE' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", reservationDetail_entity_1.ReservationDetail)
], Property.prototype, "reservationDetail", void 0);
exports.Property = Property = __decorate([
    (0, typeorm_1.Entity)({
        name: "properties",
    })
], Property);
//# sourceMappingURL=property.entity.js.map