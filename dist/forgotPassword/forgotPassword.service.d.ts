import { ForgotPasswordRepository } from './forgotPassword.repository';
export declare class ForgotPasswordService {
    private readonly forgotPasswordRepository;
    constructor(forgotPasswordRepository: ForgotPasswordRepository);
    getEmail(email: string): Promise<string>;
    changePassword(id: string, newPassword: string): Promise<string>;
}
