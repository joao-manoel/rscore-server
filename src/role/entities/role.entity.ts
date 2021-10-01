import { Prisma } from '@prisma/client';

export class Role implements Prisma.RoleUncheckedCreateInput {
  id?: number;
  name: string;
  userId?: number;
}
