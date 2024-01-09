import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request } from 'express';
import { SessionFields } from 'src/user/interfaces/session-fileds.interface';

export enum Cause {
  SESSION_EXPIRED = 'SessionExpired',
}

@Injectable()
export class AuthenticateUserMiddleware implements NestMiddleware {
  use(req: Request & { user?: SessionFields }, res: any, next: () => void) {
    const cookie = req.cookies['SESSION_ID'];

    if (!cookie) {
      throw new BadRequestException('Cookie not sent by client!', {
        cause: Cause.SESSION_EXPIRED,
      });
    }
    req.user = req.session.user;
    next();
  }
}
