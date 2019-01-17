import { Controller, Param, Get, Body, Post, Put, Delete, Query, Patch, Req, HttpService } from '@nestjs/common';
import { Request } from 'express';
import { LearnerService } from './learner.service';
import { User } from '../core/auth/id-token.interface';
import { RecordDto } from './record.dto';

@Controller()
export class LearnerController {
  constructor(private readonly learnerService: LearnerService,
              private readonly httpService: HttpService) {}

  @Get('allRecords')
  async getAllRecords() {
    return this.learnerService.getAllRecords();
  }

  @Post('addRecord')
  async addRecord(@Body() entity: RecordDto) {
    return this.learnerService.addRecord(entity);
  }

  @Get('randomWords/:userId')
  async getRandomWords(@Param('userId') userId: string){
    const data = await this.learnerService.getLearnedWords(userId);
    const response = await this.httpService.post('http://word-app:3000/word/v1/random', data).toPromise();
    return response.data;
  }

  @Get('sequenceWords/:userId')
  async getSequenceWords(@Param('userId') userId: string){
    const data = await this.learnerService.getLearnedWords(userId);
    const response = await this.httpService.post('http://word-app:3000/word/v1/sequence', data).toPromise();
    return response.data;
  }

}
