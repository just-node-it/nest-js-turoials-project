import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(searchedParam: { id?: number; email?: string; username?: string }) {
    const searchedByObject = searchedParam.id
      ? { id: searchedParam.id }
      : searchedParam.username
      ? { username: searchedParam.username }
      : { email: searchedParam.email };
    return this.prisma.user.findUnique({
      where: searchedByObject,
    });
  }

  create(dto: RegisterUserDto) {
    return this.prisma.user.create({
      data: dto,
    });
  }
}
