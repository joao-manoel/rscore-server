import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

import { User } from './../entities/user.entity';

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  roles?: Prisma.RoleCreateNestedManyWithoutUserInput;
}
