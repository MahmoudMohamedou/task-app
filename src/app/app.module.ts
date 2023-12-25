import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpFilter } from '../filter/http/http.filter';
import { GlobalFilter } from '../filter/global/global.filter';
import { UserInterceptor } from '../user/interceptors/user.interceptor';

@Module({
  imports: [UserModule],
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
export class AppModule {}
