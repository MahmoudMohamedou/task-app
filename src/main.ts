import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GlobalFilter } from './filter/global/global.filter';
import { HttpFilter } from './filter/http/http.filter';

import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as pgs from 'connect-pg-simple';
import * as cors from 'cors';
import * as express from 'express';

require('./extends.module');

// const storePostgreSQL = new (pgs(session))({
//   createTableIfMissing: true,
//   conString: process.env.DATABASE_URL,
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('public'));
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalFilter(), new HttpFilter());
  app.use(
    cors({
      origin: ['http://localhost:5173'],
      credentials: true,
    }),
  );
  app.use(
    session({
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      store: new (pgs(session))({
        conString: process.env.DATABASE_URL,
        disableTouch: true,
      }),
      secret: process.env.SESSION_SECRET || 'hard-secret',
      resave: false,
      saveUninitialized: false,
      name: 'SESSION_ID',
      cookie: {
        maxAge: 60 * 60 * 1000,
      },
    }),
  );
  // app.useGlobalInterceptors(new UserInterceptor());
  await app.listen(3000);
}
bootstrap();
