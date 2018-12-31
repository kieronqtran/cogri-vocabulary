import { Controller, Param, Get, Body, Post, Put, Delete, Query, Patch, Req } from '@nestjs/common';
import { Request } from 'express';
import { LearnerService } from './learner.service';
import { User } from '../core/auth/id-token.interface';
import { RecordDto } from './record.dto';

@Controller()
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Get('allRecords')
  async getAllRecords() {
    return this.learnerService.getAllRecords();
  }

  @Post('addRecord')
  async addRecord(@Body() entity: RecordDto) {
    return this.learnerService.addRecord(entity);
  }


}
