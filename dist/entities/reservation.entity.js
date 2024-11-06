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
exports.Reservation = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const reservationDetail_entity_1 = require("./reservationDetail.entity");
const swagger_1 = require("@nestjs/swagger");
let Reservation = class Reservation {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, user: { required: true, type: () => require("./users.entity").User }, requestedAt: { required: true, type: () => Date }, totalPrice: { required: true, type: () => Number }, active: { required: true, type: () => Boolean }, reservationDetails: { required: true, type: () => require("./reservationDetail.entity").ReservationDetail } };
    }
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(`uuid`),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.reservations),
    (0, typeorm_1.JoinColumn)({ name: `user_id` }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", users_entity_1.User)
], Reservation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Reservation.prototype, "requestedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Reservation.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], Reservation.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => reservationDetail_entity_1.ReservationDetail, (reservationDetail) => reservationDetail.reservation, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: `reservation_detail_id` }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", reservationDetail_entity_1.ReservationDetail)
], Reservation.prototype, "reservationDetails", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)({
        name: `reservations`,
    })
], Reservation);
//# sourceMappingURL=reservation.entity.js.map