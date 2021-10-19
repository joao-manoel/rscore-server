import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly _include = {
    roles: {
      select: {
        name: true,
      },
    },
    RefreshToken: {
      select: {
        id: true,
      },
    },
  };

  async GenerateNewToken(refresh_token: string) {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new Error('Refresh token invalid');
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs(refreshToken.expiresIn).unix(),
    );

    if (refreshTokenExpired) {
      await this.GenerateRefreshToken(refreshToken.userId);
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: refreshToken.userId,
      },
      include: this._include,
    });

    if (!user) {
      throw new Error('Error generate new token');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      refreshToken: user.RefreshToken.id,
      email: user.email,
      roles: user.roles,
    };
  }

  async GenerateRefreshToken(userId: string) {
    const expiresIn = dayjs().add(1, 'day').unix();

    const hasRefreshTokenUser = await this.prisma.refreshToken.findUnique({
      where: { userId },
    });

    if (hasRefreshTokenUser) {
      await this.prisma.refreshToken.deleteMany({
        where: { userId },
      });
    }

    const generateRefreshToken = await this.prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshToken;
  }
}
