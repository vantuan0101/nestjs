import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { DoccontentModule } from './doccontent/doccontent.module';
import { DocsModule } from './docs/docs.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BookmarkModule,
    UserModule,
    PrismaModule,
    DocsModule,
    DoccontentModule,
  ],
})
export class AppModule {}
