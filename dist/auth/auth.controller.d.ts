import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { TokensType } from './types/tokens.type';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getAll(): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        refresh_token: string;
    }[]>;
    login(dto: LoginDto): Promise<TokensType>;
    register(dto: RegisterDto): Promise<TokensType>;
    logout(req: Request): Promise<string>;
}
