import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email/send-email.service';

@Module({
  providers: [SendEmailService]
})
export class EmailModule {}
