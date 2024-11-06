import { PropertyRepository } from 'src/property/property.repository';
import { ReservationsRepository } from 'src/reservations/reservations.repository';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
export declare class UserRepository {
    private readonly userRepository;
    private readonly propertyRepository;
    private readonly reservationsRepository;
    constructor(userRepository: Repository<User>, propertyRepository: PropertyRepository, reservationsRepository: ReservationsRepository);
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
    userUpdate(id: string, updateUser: Partial<User>): Promise<import("typeorm").UpdateResult>;
    deactivateUser(id: string): Promise<string>;
    activeUser(id: string): Promise<string>;
    removeUser(id: string): Promise<import("typeorm").DeleteResult>;
    updateRefreshToken(id: string, refreshToken: string): Promise<User>;
}
