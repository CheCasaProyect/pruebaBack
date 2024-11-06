import { AuthService } from './auth.service';
import { UserDto } from 'src/dtos/userDto';
import { LoginDto } from 'src/dtos/loginDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signinUp(user: UserDto): Promise<string>;
    login(login: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
}
