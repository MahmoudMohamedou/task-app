import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { SignIn } from 'src/user/interfaces/sign-in.interface';
import { SignUp } from 'src/user/dto/sign-up.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signIn: SignIn, @Req() req) {
    const { email, password } = signIn;
    return this.authService.signIn(email, password, req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body(new ValidationPipe()) signUp: SignUp, @Req() req) {
    return this.authService.signUp(signUp, req);
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err: any) => {
      if (err) {
        throw new InternalServerErrorException(
          'Some error occurs when dstroy the session',
        );
      }

      res.clearCookie('SESSION_ID', {
        maxAge: 0,
      });
      res.end();
    });
  }
}
