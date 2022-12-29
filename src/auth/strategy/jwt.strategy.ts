import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtStrategy') {
  constructor(
    private readonly userService: UserService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // super must be called before accessing ‘this’ (hence not private)
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; username: string }) {
    const user: User = await this.userService.findOne({ id: payload.sub });
    if (!user) {
      return null;
    }
    const { password, ...userData } = user;
    return userData;
  }
}
