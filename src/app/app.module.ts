import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpFilter } from '../filter/http/http.filter';
import { GlobalFilter } from '../filter/global/global.filter';
import { UserInterceptor } from '../user/interceptors/user.interceptor';
import { AuthModule } from 'src/auth/auth.module';
import { AuthenticateUserMiddleware } from './middlewares/authenticate-user/authenticate-user.middleware';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateUserMiddleware)
      .exclude({ path: 'auth/login', method: RequestMethod.POST })
      .forRoutes('');
  }
}
