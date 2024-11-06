import { Property } from './property.entity';
import { Reservation } from './reservation.entity';
export declare class ReservationDetail {
    id: string;
    reservation: Reservation;
    checkIn: Date;
    checkOut: Date;
    pax: number;
    property: Property;
}
