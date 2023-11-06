import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TokensType } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  getAll() {
    return this.prisma.user.findMany();
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRt(user.id, tokens.refresh_token);
    return tokens;
  }

  async register(dto: RegisterDto): Promise<TokensType> {
    const password = await this.dataHasher(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email); // Use newUser directly
    await this.updateRt(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async updateRt(userId: number, rt: string) {
    try {
      const token = await this.dataHasher(rt);

      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          refresh_token: token,
        },
      });
    } catch (error) {
      // Handle the error, e.g., log it or throw a custom exception
      throw new Error('Failed to update refresh token: ' + error.message);
    }
  }

  async logout(userId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
        refresh_token: {
          not: null,
        },
      },
      data: {
        refresh_token: null,
      },
    });
    return 'Logged Out';
  }

  async getTokens(id: number, email: string): Promise<TokensType> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 25,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async dataHasher(data: string) {
    return await bcrypt.hash(data, 10);
  }
}
