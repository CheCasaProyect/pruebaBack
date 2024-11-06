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
exports.ReservationsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("../entities/property.entity");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("../entities/reservation.entity");
const users_entity_1 = require("../entities/users.entity");
const reservationDetail_entity_1 = require("../entities/reservationDetail.entity");
const mailer_1 = require("../config/mailer");
let ReservationsRepository = class ReservationsRepository {
    constructor(reservationRepository, propertyRepository, userRepository, reservationDetailsRepository) {
        this.reservationRepository = reservationRepository;
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
        this.reservationDetailsRepository = reservationDetailsRepository;
    }
    async createReservation(createReservation) {
        console.log('Payload de reserva: ', createReservation);
        if (!createReservation) {
            throw new common_1.BadRequestException('El objeto reservation o userId es inválido');
        }
        const property = await this.propertyRepository.findOne({
            where: { id: createReservation.propertyId, isAvailable: true },
        });
        if (!property) {
            throw new common_1.NotFoundException('La propiedad no existe o no está disponible');
        }
        console.log(property);
        const user = await this.userRepository.findOne({
            where: { id: createReservation.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('usuario inexistente');
        }
        console.log(user);
        const newReservationDetails = this.reservationDetailsRepository.create({
            checkIn: createReservation.checkIn,
            checkOut: createReservation.checkOut,
            pax: createReservation.pax,
            property: property,
        });
        await this.reservationDetailsRepository.save(newReservationDetails);
        const duration = (new Date(createReservation.checkOut).getTime() -
            new Date(createReservation.checkIn).getTime()) /
            (1000 * 3600 * 24);
        const totalPrice = duration * property.price;
        const newReservation = this.reservationRepository.create({
            user: user,
            requestedAt: new Date(),
            reservationDetails: newReservationDetails,
            totalPrice: totalPrice,
        });
        await this.reservationRepository.save(newReservation);
        await mailer_1.transporter.sendMail({
            from: '"Tu reserva en CheCasa fue exitosa" <che.casa.proyect@gmail.com>',
            to: user.email,
            subject: 'Reserva exitosa',
            html: `
      <b>Los datos de tu reserva son:</b>
      <ul>
      <li><p>Nombre del reservante: ${newReservation.user.firstname}</p></li>
      <li><p>Apellido del reservante: ${newReservation.user.lastname}</p></li>
      <li><p>Fecha de la operación: ${newReservation.requestedAt}</p></li>
      <li><p>Propiedad: ${newReservation.reservationDetails.property.title}</p></li>
      <li><p>Ubicación de la propiedad: ${newReservation.reservationDetails.property.state}</p></li>
        <li><p>Fecha de inicio de la reserva: ${newReservation.reservationDetails.checkIn}</p></li>
        <li><p>Fecha de finalización de la reserva: ${newReservation.reservationDetails.checkOut}</p></li>
        <li><p>Nro. de huéspedes reservados: ${newReservation.reservationDetails.pax}</p></li>
        <li><p>Total de precio pagado: ${newReservation.totalPrice}</p></li>
      </ul>
      `,
        });
        return newReservation;
    }
    async cancelReservation(id) {
        const reservation = await this.reservationRepository.findOneBy({ id });
        if (!reservation)
            throw new common_1.NotFoundException('Reservation not found');
        reservation.active = false;
        const user = await this.userRepository.findOne({
            where: { id: reservation.user.id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await mailer_1.transporter.sendMail({
            from: '"Tu reserva en CheCasa fue cancelada eitosamente 😔" <che.casa.proyect@gmail.com>',
            to: user.email,
            subject: 'Reserva cancelada con éxito',
            html: `
      <b>Los datos de tu reserva cancelada son:</b>
      <ul>
      <li><p>Nombre del reservante: ${reservation.user.firstname}</p></li>
      <li><p>Apellido del reservante: ${reservation.user.lastname}</p></li>
      <li><p>Fecha de la operación de la reserva: ${reservation.requestedAt}</p></li>
      <li><p>Propiedad: ${reservation.reservationDetails.property.title}</p></li>
      <li><p>Ubicación de la propiedad: ${reservation.reservationDetails.property.state}</p></li>
        <li><p>Fecha de inicio de la reserva: ${reservation.reservationDetails.checkIn}</p></li>
        <li><p>Fecha de finalización de la reserva: ${reservation.reservationDetails.checkOut}</p></li>
        <li><p>Nro. de huéspedes reservados: ${reservation.reservationDetails.pax}</p></li>
        <li><p>Total de dinero a devolver: ${reservation.totalPrice}</p></li>
      </ul>
      `,
        });
        await this.reservationRepository.save(reservation);
    }
    async getAllReservation() {
        return await this.reservationRepository.find();
    }
    async getReservationByUserId(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['reservations'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.reservations && user.reservations.length > 0
            ? user.reservations
            : [];
    }
};
exports.ReservationsRepository = ReservationsRepository;
exports.ReservationsRepository = ReservationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __param(1, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(reservationDetail_entity_1.ReservationDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReservationsRepository);
//# sourceMappingURL=reservations.repository.js.map