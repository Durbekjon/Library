import { LoginDto, RegisterDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokensType } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        email: string;
        password: string;
        refresh_token: string;
    }[]>;
    login(dto: LoginDto): Promise<TokensType>;
    register(dto: RegisterDto): Promise<TokensType>;
    updateRt(userId: number, rt: string): Promise<void>;
    logout(userId: number): Promise<string>;
    getTokens(id: number, email: string): Promise<TokensType>;
    dataHasher(data: string): Promise<any>;
}
