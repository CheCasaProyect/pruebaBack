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
exports.ReservationDetail = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const property_entity_1 = require("./property.entity");
const swagger_1 = require("@nestjs/swagger");
const reservation_entity_1 = require("./reservation.entity");
let ReservationDetail = class ReservationDetail {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, reservation: { required: true, type: () => require("./reservation.entity").Reservation }, checkIn: { required: true, type: () => Date }, checkOut: { required: true, type: () => Date }, pax: { required: true, type: () => Number }, property: { required: true, type: () => require("./property.entity").Property } };
    }
};
exports.ReservationDetail = ReservationDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => reservation_entity_1.Reservation, (reservation) => reservation.reservationDetails, { cascade: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: `reservation_id` }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", reservation_entity_1.Reservation)
], ReservationDetail.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReservationDetail.prototype, "checkIn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReservationDetail.prototype, "checkOut", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservationDetail.prototype, "pax", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => property_entity_1.Property, (property) => property.reservationDetail, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: `property_id` }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", property_entity_1.Property)
], ReservationDetail.prototype, "property", void 0);
exports.ReservationDetail = ReservationDetail = __decorate([
    (0, typeorm_1.Entity)({
        name: `reservations_details`,
    })
], ReservationDetail);
//# sourceMappingURL=reservationDetail.entity.js.map