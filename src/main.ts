import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config';


async function start() {
  
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  console.log(config);

  const PORT = config.get<number>('PORT')

  console.log(config.get('POSTGRES_PASSWORD'));

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  const swagger = new DocumentBuilder()
  .setTitle('MohirDev')
  .setDescription('Rest Api')
  .setVersion('1.0.0')
  .addTag('NodeJs, NestJs, Postgres, Sequalize')
  .build()

  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('/api/docs', app, document)


  await app.listen(PORT, () => {
    console.log(`Server is running.... http://localhost:${PORT}/api/docs`);
  });
}
start();
