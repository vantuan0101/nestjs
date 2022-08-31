import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
interface SendMail {
  to: string;
  subject: string;
  htmlContent: string;
}
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
  ) {}

  async sendUserConfirmation(options: SendMail) {
    await this.mailerService.sendMail({
      to: options.to,
      subject: options.subject,
      text: options.htmlContent,
    });
    // await this.mailerService.sendMail({
    //   to: 'pinpinbc@gmail.com',
    //   // from: '"Support Team" <support@example.com>', // override default from
    //   subject:
    //     'Welcome to Nice App! Confirm your Email',
    //   text: 'Hello world?',
    // });
  }
}
