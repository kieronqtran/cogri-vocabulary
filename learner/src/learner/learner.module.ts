import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '../core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './record.entity';
import { RecordRepository } from './record.repository';
import { LearnerService } from './learner.service';
import { LearnerController } from './learner.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Word, RecordRepository]),
  ],
  controllers: [
    LearnerController,
  ],
  providers: [
    LearnerService,
  ],
})
export class LearnerModule {}
