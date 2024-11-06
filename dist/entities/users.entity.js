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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const reservation_entity_1 = require("./reservation.entity");
const property_entity_1 = require("./property.entity");
const review_entity_1 = require("./review.entity");
const uuid_1 = require("uuid");
let User = class User {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, firstname: { required: true, type: () => String }, lastname: { required: true, type: () => String }, birthdate: { required: true, type: () => String }, phone: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, active: { required: true, type: () => Boolean }, profileImgUrl: { required: true, type: () => String }, refreshToken: { required: false, type: () => String }, reservations: { required: true, type: () => [require("./reservation.entity").Reservation] }, properties: { required: true, type: () => [require("./property.entity").Property] }, reviews: { required: true, type: () => [require("./review.entity").Review] } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({
        description: 'User id',
        format: 'uuid',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'User firstname',
        example: 'CheCasa',
    }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'User lastname',
        example: 'CheCasa',
    }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Phone number',
        example: '5491122334455',
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true, nullable: false }),
    (0, swagger_1.ApiProperty)({
        description: 'User email',
        example: 'checasa@test.com',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'checasa123',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'https://res.cloudinary.com/dddh5wrx3/image/upload/v1729712425/png-clipart-default-facebook-user-profile-blue-silhouette-neck-symbol-sky-folder-users-blue-silhouette_lfuate.png',
    }),
    __metadata("design:type", String)
], User.prototype, "profileImgUrl", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, (reservations) => reservations.user, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], User.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => property_entity_1.Property, (properties) => properties.owner, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], User.prototype, "properties", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (reviews) => reviews.user, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users',
    })
], User);
//# sourceMappingURL=users.entity.js.map