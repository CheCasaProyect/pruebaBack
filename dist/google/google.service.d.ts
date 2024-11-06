import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
export declare class GoogleService {
    private readonly userRepository;
    private readonly jwtService;
    private userId;
    private readonly SALT_ROUNDS;
    private client;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    googleAuthRedirect(token: string, res: any): Promise<void>;
    private generateAccessToken;
    private generateRefreshToken;
}
