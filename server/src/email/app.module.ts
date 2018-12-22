import { Module } from '@nestjs/common';
import { EmailModule as EmailV1Module } from './v1/email.module';

@Module({
  imports: [EmailV1Module],
})
export class AppModule {}
