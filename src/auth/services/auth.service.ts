import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { compare } from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(username: string, pass: string, req: Request): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);
    const isPasswordMatch = await compare(pass, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    req.session['user'] = result;
    return result;
  }
}
