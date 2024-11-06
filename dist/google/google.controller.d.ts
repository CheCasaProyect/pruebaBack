import { GoogleService } from './google.service';
export declare class GoogleController {
    private readonly googleService;
    constructor(googleService: GoogleService);
    signinWithGoogle(body: {
        access_token: string;
    }): Promise<void>;
    googleOAuthredirect(req: any, res: any): Promise<void>;
}
