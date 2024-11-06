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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const swagger_1 = require("@nestjs/swagger");
const createReservationDto_1 = require("../dtos/createReservationDto");
const role_guard_1 = require("../guards/role.guard");
const auth_guard_1 = require("../guards/auth.guard");
let ReservationsController = class ReservationsController {
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    getAllReservations() {
        return this.reservationsService.getAllReservation();
    }
    createReservation(createReservation) {
        console.log('Payload de Reserva: ', createReservation);
        return this.reservationsService.createReservation(createReservation);
    }
    cancelReservation(id) {
        return this.cancelReservation(id);
    }
    getUserReservations(userId) {
        return this.reservationsService.getUserReservations(userId);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'All Reservations' }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(role_guard_1.AccessGuard),
    openapi.ApiResponse({ status: 200, type: [require("../entities/reservation.entity").Reservation] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "getAllReservations", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Reservation' }),
    (0, common_1.Post)('newReservation'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("../entities/reservation.entity").Reservation }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createReservationDto_1.CreateReservationDTO]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "createReservation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cancel Reservation' }),
    (0, common_1.Put)(':id/cancel'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "cancelReservation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User Reservation' }),
    (0, common_1.Get)(':id/user'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: [require("../entities/reservation.entity").Reservation] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "getUserReservations", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, swagger_1.ApiTags)('reservations'),
    (0, common_1.Controller)('reservations'),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map