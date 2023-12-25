import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalFilter } from './filter/global/global.filter';
import { HttpFilter } from './filter/http/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalFilter(), new HttpFilter());
  await app.listen(3000);
}
bootstrap();
