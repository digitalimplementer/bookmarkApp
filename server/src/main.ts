// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';

import { AppModule } from './app.module';

const port = process.env.PORT || 4000;

async function bootstrap() {
   const app = await NestFactory.create(AppModule, { cors: true });
   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
      }),
   );
   app.use('./uploadedFiles', express.static(path.join(__dirname, 'uploadedFiles')));
   await app.listen(port);

   if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
   }
}

bootstrap();
