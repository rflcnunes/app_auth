import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashHelper } from 'src/helpers/hash.helper';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { email: string; password: string }) {
    const userFromDb = await this.usersService.findByEmail(user.email);

    const isPasswordCorrect = userFromDb
      ? await HashHelper.checkPassword(user.password, userFromDb.password)
      : false;

    if (!isPasswordCorrect) {
      throw new Error('Email or password is incorrect');
    }

    const payload = { sub: userFromDb.id, email: userFromDb.email };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
