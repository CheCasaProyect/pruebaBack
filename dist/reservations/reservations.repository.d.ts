import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { User } from 'src/entities/users.entity';
import { ReservationDetail } from 'src/entities/reservationDetail.entity';
import { CreateReservationDTO } from 'src/dtos/createReservationDto';
export declare class ReservationsRepository {
    private readonly reservationRepository;
    private readonly propertyRepository;
    private readonly userRepository;
    private readonly reservationDetailsRepository;
    constructor(reservationRepository: Repository<Reservation>, propertyRepository: Repository<Property>, userRepository: Repository<User>, reservationDetailsRepository: Repository<ReservationDetail>);
    createReservation(createReservation: CreateReservationDTO): Promise<Reservation>;
    cancelReservation(id: string): Promise<void>;
    getAllReservation(): Promise<Reservation[]>;
    getReservationByUserId(userId: string): Promise<Reservation[]>;
}
