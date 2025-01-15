/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Management REST API With Nest.js')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  if (process.env.REPOSITORY == 'MONGOOSE') {
    console.log(`Database hosting in ${process.env.DATABASE_URL}`);
  }
  console.log(
    `Server listing on url ${process.env.HOST}:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
