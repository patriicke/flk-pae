import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EUserStatusType } from '~/shared/enums/EUserStatusType';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: {
    id: string;
    email: string;
    role: string;
    status: EUserStatusType;
  }) {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      status: payload.status
    };
  }
}
