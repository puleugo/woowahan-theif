import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { dataSource } from './app/data-source';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  await dataSource.initialize();

  await app.listen(3000);
}

bootstrap();
