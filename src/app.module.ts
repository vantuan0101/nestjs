import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DocCodeModule } from './DocCode/docCode.module';
import { DocsModule } from './docs/docs.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    DocsModule,
    DocCodeModule,
    CloudinaryModule,
    // MailModule,
  ],
  // providers: [MailService],
})
export class AppModule {}
