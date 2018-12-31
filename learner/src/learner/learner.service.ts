import { Injectable } from '@nestjs/common';
import { RecordRepository } from './record.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './record.entity';
import { RecordDto } from './record.dto';

@Injectable()
export class LearnerService {
  constructor(
    @InjectRepository(RecordRepository) private readonly recordRepository: RecordRepository,
  ) {}

  async getAllRecords() {
    return this.recordRepository.find();
  }

  async addRecord(entity : RecordDto){

    return this.recordRepository.insert(entity);
  }

}
