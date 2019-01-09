import { Injectable } from '@nestjs/common';
import { RecordRepository } from './record.repository';
import { InjectRepository } from '@nestjs/typeorm';
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

    const AWS = require('aws-sdk');
    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

    const params = {
      DelaySeconds: 10,
      MessageAttributes: {
        "Title": {
          DataType: "String",
          StringValue: "Add Record"
        }
      },
      MessageBody: "Create new record",
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/553559550642/testing"
    };

    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
      }
    });

    return this.recordRepository.insert(entity);
  }

}
