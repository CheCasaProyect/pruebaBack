import { User } from 'src/entities/users.entity';
import { UserRepository } from 'src/user/user.repository';
import { Repository } from 'typeorm';
export declare class ForgotPasswordRepository {
    private readonly userDBRepository;
    private readonly userRepository;
    constructor(userDBRepository: Repository<User>, userRepository: UserRepository);
    getEmail(email: string): Promise<string>;
    changePassword(id: string, newPassword: string): Promise<string>;
}
