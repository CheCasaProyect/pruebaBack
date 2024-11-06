import { ReservationsRepository } from './reservations.repository';
import { CreateReservationDTO } from 'src/dtos/createReservationDto';
export declare class ReservationsService {
    private readonly reservationRepository;
    constructor(reservationRepository: ReservationsRepository);
    createReservation(createReservation: CreateReservationDTO): Promise<import("../entities/reservation.entity").Reservation>;
    getAllReservation(): Promise<import("../entities/reservation.entity").Reservation[]>;
    getUserReservations(userId: string): Promise<import("../entities/reservation.entity").Reservation[]>;
}
