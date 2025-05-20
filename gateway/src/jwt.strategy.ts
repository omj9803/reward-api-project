import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt-secret-key', // ✅ auth와 동일한 키여야 함
    });
  }

  async validate(payload: any) {
    return {
      username: payload.username,
      role: payload.role,
      userId: payload.sub,
    };
  }
}
