import type { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private jwtService;
    private readonly users;
    constructor(jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
    logout(): Promise<{
        message: string;
    }>;
}
