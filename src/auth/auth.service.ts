import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user) {
    const payload = { sub: user.id, email: user.email, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
      email: user.email,
      roles: user.roles,
    };
  }

  async session(user) {
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
    let user;

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
