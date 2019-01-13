import { Injectable } from '@nestjs/common';
import { RecordRepository } from './record.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordDto } from './record.dto';

@Injectable()
export class LearnerService {
  constructor(
    @InjectRepository(RecordRepository)
    private readonly recordRepository: RecordRepository,
  ) {}

  async getAllRecords() {
    return this.recordRepository.find();
  }

  async addRecord(entity: RecordDto) {
    const AWS = require('aws-sdk');
    AWS.config.update({ region: 'us-east-1' });
    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

    const params = {
      DelaySeconds: 10,
      MessageAttributes: {
        Title: {
          DataType: 'String',
          StringValue: 'Add New Record',
        },
      },
      MessageBody: 'New Record Added',
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/553559550642/testing',
    };

    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.MessageId);
      }
    });

    const AWS = require('aws-sdk');
    AWS.config.update({region: 'us-east-1'});
    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

    const params = {
      DelaySeconds: 10,
      MessageAttributes: {
        "Title": {
          DataType: "String",
          StringValue: "Add New Record"
        }
      },
      MessageBody: "New Record Added",
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

  async getLearnedWords(userId: string) {
    const result = { learnedWords: [] };
    const query = `SELECT * FROM record WHERE learner_id = '` + userId + `'`;
    const builder = await this.recordRepository.manager.query(query);
    builder.map(e => {
      return result.learnedWords.push(e.word_id);
    });
    return result;
  }
}
