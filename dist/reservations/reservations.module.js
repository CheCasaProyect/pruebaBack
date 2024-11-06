"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsModule = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const reservations_controller_1 = require("./reservations.controller");
const reservations_repository_1 = require("./reservations.repository");
const reservation_entity_1 = require("../entities/reservation.entity");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("../entities/property.entity");
const users_entity_1 = require("../entities/users.entity");
const reservationDetail_entity_1 = require("../entities/reservationDetail.entity");
let ReservationsModule = class ReservationsModule {
};
exports.ReservationsModule = ReservationsModule;
exports.ReservationsModule = ReservationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([reservation_entity_1.Reservation, property_entity_1.Property, users_entity_1.User, reservationDetail_entity_1.ReservationDetail]),
        ],
        controllers: [reservations_controller_1.ReservationsController],
        providers: [reservations_service_1.ReservationsService, reservations_repository_1.ReservationsRepository],
        exports: [reservations_repository_1.ReservationsRepository],
    })
], ReservationsModule);
//# sourceMappingURL=reservations.module.js.map