import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly _include = {
    roles: {
      select: {
        name: true,
      },
    },
  };

  async create(data: CreateUserDto) {
    const user = await this.prisma.user.create({
      data,
      include: this._include,
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: this._include,
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: this._include,
    });

    if (user === null) {
      throw Error(`Usuário com o id ${id} não encontrado.`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          email,
        },
        include: this._include,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data,
      include: this._include,
    });

    return true;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
