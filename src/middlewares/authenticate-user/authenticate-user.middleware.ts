import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { SessionFields } from 'src/user/interfaces/session-fileds.interface';

@Injectable()
export class AuthenticateUserMiddleware implements NestMiddleware {
  use(req: Request & { user?: SessionFields }, res: any, next: () => void) {
    const cookie = req.cookies['SESSION_ID'];
    if (!cookie) {
      throw new UnauthorizedException();
    }
    req.user = req.session.user;
    next();
  }
}
