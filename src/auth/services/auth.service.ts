import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { SignUp } from 'src/user/dto/sign-up.dto';
import { TokenService } from 'src/token/token.service';
import { sendEmail } from 'src/utils/verify-account';
import * as hb from 'handlebars';
import * as fs from 'fs';
import { context } from 'config';
import * as path from "path";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private tokenService: TokenService,
  ) {}

  async signIn(username: string, pass: string, req: Request): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);
    if (!user) {
      throw new NotFoundException('email not found');
    }
    const isPasswordMatch = await compare(pass, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    // Check if user account is validated

    if (!user.validated) {
      throw new UnauthorizedException('User Account Not validated !');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    req.session['user'] = result;
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signUp(params: SignUp, _req: Request, res: Response): Promise<any> {
    const { email, password, name } = params;
    // create user with token
    // to validate his account
    const userWithToken = await this.usersService.create({
      email,
      name,
      password,
    });

    // Send an email to verify account
    const isProd = process.env.NODE_ENV === 'prod';
    const url = `${
      isProd ? process.env.HOST_SERVER_PROD : process.env.HOST_SERVER_LOCAL
    }/auth/verify/${userWithToken.id}/${userWithToken.token.token}`;
    const html = fs
      .readFileSync(path.join('public', 'verify-email-template.html'), { encoding: 'utf-8' })
      .toString();
    const content = hb.compile(html)({
      url,
    });
    await sendEmail(userWithToken.email, 'Verify Account', content);
    res.json(true);
  }

  async isValidSession(req: Request, res: Response): Promise<any> {
    const cookie = req.headers.cookie;
    if (!cookie) {
      res.json(null);
      return;
    }

    res.json(req.session.user);
  }

  async verifyAccount(userId: string, token: string, res: Response) {
    // Check if user exist
    const user = await context.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).sendFile('error.html', {
        root: 'public',
      });
    }
    // check if user token exist
    const tokenRow = await context.token.findUnique({
      where: {
        token,
        userId: user.id,
      },
    });

    if (!tokenRow) {
      return res.status(400).sendFile('error.html', {
        root: 'public',
      });
    }

    await context.$transaction([
      context.user.update({
        where: { id: user.id },
        data: { validated: true },
      }),
      context.token.delete({
        where: {
          id: tokenRow.id,
        },
      }),
    ]);

    return res.status(200).sendFile('success.html', {
      root: 'public',
    });
  }
}
