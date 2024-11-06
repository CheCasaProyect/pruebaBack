import { User } from './users.entity';
import { Property } from './property.entity';
export declare class Review {
    id: string;
    user: User;
    property: Property;
    reviewDate: Date;
    comment: string;
    rating: number;
}
