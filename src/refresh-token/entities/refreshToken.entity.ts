import { Prisma } from '@prisma/client';
export class RefreshToken implements Prisma.RefreshTokenCreateInput {
  id?: string;
  expiresIn: number;
  user: Prisma.UserCreateNestedOneWithoutRefreshTokenInput;
}
