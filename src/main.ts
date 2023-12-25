import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GlobalFilter } from './filter/global/global.filter';
import { HttpFilter } from './filter/http/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalFilter(), new HttpFilter());
  // app.useGlobalInterceptors(new UserInterceptor());
  await app.listen(3000);
}
bootstrap();
