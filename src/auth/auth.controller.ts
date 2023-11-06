import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { TokensType } from './types/tokens.type';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  async getAll() {
    return this.authService.getAll();
  }
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<TokensType> {
    return this.authService.login(dto);
  }
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<TokensType> {
    return this.authService.register(dto);
  }
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['sub']);
  }
}
