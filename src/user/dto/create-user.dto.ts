import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { Prisma } from '@prisma/client';

import { RegExHelper } from './../../helpers/regex.helper';
import { User } from './../entities/user.entity';
import { MessagesHelper } from 'src/helpers/messages.helpers';

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;

  @IsOptional()
  roles?: Prisma.RoleCreateNestedManyWithoutUserInput;
}
