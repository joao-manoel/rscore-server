import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

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
}
