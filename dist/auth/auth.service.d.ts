import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/entities/users.entity";
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private userId;
    private readonly SALT_ROUNDS;
    private client;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(user: Partial<User>): Promise<string>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
    googleAuthRedirect(token: string, res: any): Promise<void>;
    private generateAccessToken;
    private generateRefreshToken;
}
