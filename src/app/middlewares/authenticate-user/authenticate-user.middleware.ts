import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticateUserMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const cookie = req.cookies['SESSION_ID'];
    console.log('Cookie: ', cookie);
    if (!cookie) {
      throw new UnauthorizedException();
    }
    next();
  }
}
