/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsMatch } from 'src/decorators/confirm-password.decorator';

/* eslint-disable prettier/prettier */
export class SignUp {
  @IsEmail()
  email: string;
  @MinLength(3)
  @MaxLength(8)
  password: string;
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsMatch('password', {
    message: "The password & repeated password doesn't match",
  })
  repeatPassword: string;
}
