import { ReservationsService } from './reservations.service';
import { CreateReservationDTO } from 'src/dtos/createReservationDto';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    getAllReservations(): Promise<import("../entities/reservation.entity").Reservation[]>;
    createReservation(createReservation: CreateReservationDTO): Promise<import("../entities/reservation.entity").Reservation>;
    cancelReservation(id: string): any;
    getUserReservations(userId: string): Promise<import("../entities/reservation.entity").Reservation[]>;
}
