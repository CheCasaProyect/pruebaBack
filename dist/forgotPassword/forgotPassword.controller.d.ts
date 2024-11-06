import { ForgotPasswordService } from './forgotPassword.service';
export declare class ForgotPasswordController {
    private readonly forgotPasswordService;
    constructor(forgotPasswordService: ForgotPasswordService);
    getEmail(email: string): Promise<string>;
    changePassword(id: string, newPassword: string): Promise<string>;
}
