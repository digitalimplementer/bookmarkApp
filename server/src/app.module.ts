import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      ServeStaticModule.forRoot({
         rootPath: join(__dirname, '..', 'public'),
         serveStaticOptions: { index: false },
      }),
      AuthModule,
      UserModule,
      BookmarkModule,
      PrismaModule,
   ],
})
export class AppModule {}
