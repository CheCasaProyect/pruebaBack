import { UserService } from './user.service';
import { User } from 'src/entities/users.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUser(): Promise<{
        id: string;
        firstname: string;
        lastname: string;
        birthdate: string;
        phone: string;
        email: string;
        active: boolean;
        profileImgUrl: string;
        isAdmin: boolean;
        refreshToken?: string;
        reservations: import("../entities/reservation.entity").Reservation[];
        properties: import("../entities/property.entity").Property[];
        reviews: import("../entities/review.entity").Review[];
    }[]>;
    getUserByEmail(email: string): Promise<User>;
    deactivateUser(id: string): Promise<string>;
    activateUser(id: string): Promise<string>;
    removeUser(id: string): Promise<string>;
    getUserById(id: string): Promise<{
        id: string;
        firstname: string;
        lastname: string;
        birthdate: string;
        phone: string;
        email: string;
        active: boolean;
        profileImgUrl: string;
        isAdmin: boolean;
        refreshToken?: string;
        reservations: import("../entities/reservation.entity").Reservation[];
        properties: import("../entities/property.entity").Property[];
        reviews: import("../entities/review.entity").Review[];
    }>;
    updateUser(id: string, updateUser: User): Promise<Partial<User>>;
}
