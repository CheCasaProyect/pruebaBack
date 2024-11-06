import { Reservation } from './reservation.entity';
import { Property } from './property.entity';
import { Review } from './review.entity';
export declare class User {
    id: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    phone: string;
    email: string;
    password: string;
    active: boolean;
    profileImgUrl: string;
    isAdmin: boolean;
    refreshToken?: string;
    reservations: Reservation[];
    properties: Property[];
    reviews: Review[];
}
