import { User } from './users.entity';
import { Review } from './review.entity';
import { ReservationDetail } from './reservationDetail.entity';
export declare class Property {
    id: string;
    owner: User;
    active: boolean;
    title: string;
    description: string;
    state: string;
    city: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    isAvailable: boolean;
    capacity: number;
    photos: string[];
    stripeProductId: string;
    stripePriceId: string;
    latitude?: string;
    longitude?: string;
    reviews: Review[];
    reservationDetail: ReservationDetail;
}
