import { UserRepository } from './user.repository';
import { User } from 'src/entities/users.entity';
import { UserDto } from 'src/dtos/userDto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getAllUsers(): Promise<{
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
    getUserByEmail(email: string): Promise<User>;
    createUser(userData: UserDto): Promise<{
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
    deactivateUser(id: string): Promise<string>;
    activeUser(id: string): Promise<string>;
    removeUser(id: string): Promise<string>;
}
