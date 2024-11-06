import { User } from './users.entity';
import { ReservationDetail } from './reservationDetail.entity';
export declare class Reservation {
    id: string;
    user: User;
    requestedAt: Date;
    totalPrice: number;
    active: boolean;
    reservationDetails: ReservationDetail;
}
