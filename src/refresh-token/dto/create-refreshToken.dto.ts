import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { RefreshToken } from './../entities/refreshToken.entity';

export class CreateRefreshTokenDto extends RefreshToken {
  @IsNotEmpty()
  @IsString()
  expiresIn: number;

  @IsNotEmpty()
  user: Prisma.UserCreateNestedOneWithoutRefreshTokenInput;
}
