import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { SignIn } from 'src/user/interfaces/sign-in.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signIn: SignIn, @Request() req) {
    const { email, password } = signIn;
    return this.authService.signIn(email, password, req);
  }
}
