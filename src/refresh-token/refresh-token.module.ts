import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import * as dayjs from 'dayjs';

import { PrismaService } from './../prisma/prisma.service';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenController } from './refresh-token.controller';

@Module({
  imports: [
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: dayjs().add(15, 'minutes').unix() },
    }),
  ],
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService, PrismaService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
