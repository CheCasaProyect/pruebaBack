"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const users_entity_1 = require("../entities/users.entity");
const property_repository_1 = require("../property/property.repository");
const reservations_repository_1 = require("../reservations/reservations.repository");
const property_entity_1 = require("../entities/property.entity");
const reservation_entity_1 = require("../entities/reservation.entity");
const reservationDetail_entity_1 = require("../entities/reservationDetail.entity");
const cloudinary_1 = require("../config/cloudinary");
const cloudinary_service_1 = require("../files/cloudinary.service");
const axios_1 = require("@nestjs/axios");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, property_entity_1.Property, reservation_entity_1.Reservation, reservationDetail_entity_1.ReservationDetail]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            user_repository_1.UserRepository,
            property_repository_1.PropertyRepository,
            reservations_repository_1.ReservationsRepository,
            cloudinary_service_1.CloudinaryService,
            cloudinary_1.CloudinaryConfig,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map