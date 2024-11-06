import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/entities/users.entity";
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(user: Partial<User>): Promise<string>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
}
