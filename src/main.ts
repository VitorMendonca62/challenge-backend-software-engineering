import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Server listing on url ${process.env.HOST}:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
