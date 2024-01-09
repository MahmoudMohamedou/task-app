import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { compare } from 'bcrypt';
import { Request } from 'express';
import { SignUp } from 'src/user/dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(username: string, pass: string, req: Request): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);
    if (!user) {
      throw new NotFoundException('email not found');
    }
    const isPasswordMatch = await compare(pass, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    req.session['user'] = result;
    return result;
  }

  async signUp(params: SignUp, req: Request): Promise<any> {
    const { email, password, name } = params;
    const user = await this.usersService.create({
      email,
      name,
      password,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...result } = user;
    req.session['user'] = result;
    return result;
  }
}
