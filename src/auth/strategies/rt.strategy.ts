import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-secret',
      passReqToCallback: false,
    });
  }
  validate(req: Request, payload: any) {
    const refreshToken = req.get('authorization').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
