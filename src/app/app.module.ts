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
import { AuthenticateUserMiddleware } from 'src/middlewares/authenticate-user/authenticate-user.middleware';
import { TaskModule } from 'src/task/task.module';
import { CommentModule } from 'src/comment/comment.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [UserModule, AuthModule, TaskModule, CommentModule, TokenModule],
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
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/is-session-valid', method: RequestMethod.GET },
        { path: 'auth/verify/:userId/:token', method: RequestMethod.GET },
        // { path: '/user', method: RequestMethod.POST },
      )
      .forRoutes('');
  }
}
