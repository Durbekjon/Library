import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AtStrategy, RtStrategy],
  imports: [JwtModule.register({})],
})
export class AuthModule {}
