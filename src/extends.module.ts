/* eslint-disable prettier/prettier */
import { SessionFields } from './user/interfaces/session-fileds.interface';

declare module 'express-session' {
  interface SessionData {
    user: SessionFields;
  }
}
