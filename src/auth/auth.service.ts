import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { LoginUserDto, RegisterUserDto } from './dto';
import * as argon from 'argon2';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async signJwtToken(
    userId: number,
    username: string,
  ): Promise<{ accessToken: string }> {
    const secret = this.config.get('JWT_SECRET');
    const payload = {
      sub: userId,
      username,
    };
    const accessToken: string = await this.jwt.signAsync(payload, {
      expiresIn: '20m',
      secret,
    });
    return { accessToken };
  }

  async register(dto: RegisterUserDto) {
    const { password, ...data } = dto;
    // generate hash from the plain password
    const hash: string = await argon.hash(password);

    try {
      const user: User = await this.userService.create({
        ...data,
        password: hash,
      });
      return this.signJwtToken(user.id, user.username);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ForbiddenException('Credentials taken.');
      }
    }
  }

  async login(dto: LoginUserDto) {
    const searchedByObject = dto.email
      ? { email: dto.email }
      : { username: dto.username };
    const user: User = await this.userService.findOne(searchedByObject);

    if (!user) {
      throw new ForbiddenException('Incorrect credentials. Try again.');
    }

    // password verification
    const pwsMatched: boolean = await argon.verify(user.password, dto.password);
    if (!pwsMatched) {
      throw new ForbiddenException('Incorrect credentials. Try again.');
    }
    return this.signJwtToken(user.id, user.username);
  }
}
