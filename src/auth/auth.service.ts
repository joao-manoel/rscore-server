import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

import { UserService } from './../user/user.service';
import { RefreshTokenService } from './../refresh-token/refresh-token.service';

type User = {
  id: string;
  email: string;
  name: string;
  roles: string[];
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email, roles: user.roles };

    const refreshToken = await this.refreshTokenService.GenerateRefreshToken(
      user.id,
    );

    return {
      token: this.jwtService.sign(payload),
      refreshToken: refreshToken.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
  }

  async session(user: User) {
    try {
      const _user = await this.userService.findOne(user.id);

      return {
        email: _user.email,
        roles: _user.roles,
      };
    } catch (error) {
      return null;
    }
  }

  async validateUser(email: string, password: string) {
    let user: any;

    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
