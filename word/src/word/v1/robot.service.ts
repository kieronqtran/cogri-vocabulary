import { Injectable } from '@nestjs/common';
import { WordRepository } from './word.repository';
import { Word } from './word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WordService } from './word.service';
import * as AWS from 'aws-sdk';
import { SQS } from 'aws-sdk';
import { ReceiveMessageResult } from 'aws-sdk/clients/sqs';
import { LoggerService } from '../../core';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

@Injectable()
export class RobotService {
  private readonly logger = LoggerService.createLogger(RobotService.name);
  private sqs = new SQS({apiVersion: '2012-11-05'});

  constructor(
    @InjectRepository(WordRepository) private readonly wordRepository: WordRepository,
    private readonly wordService: WordService,
  ) {}

  async onModuleInit() {
    await this.startJob();
  }

  async startJob() {
    try {
      const params = {
        AttributeNames: [
          'SentTimestamp',
        ],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
          'All',
        ],
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/553559550642/insert-word.fifo',
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0,
      };

      setInterval(() => {
        this.sqs.receiveMessage(params,  (err, messageList) => {
          if (err) {
            console.error(err);
          }
          console.log(messageList);
          if (messageList.Messages) {
            messageList.Messages.forEach((message) => {
            const word = JSON.parse(message.MessageAttributes.Value.StringValue);
            const wordEntity = new Word(word);
            this.wordRepository.insert(wordEntity).then(_ => {
              const deleteParams = {
                QueueUrl: 'https://sqs.us-east-1.amazonaws.com/553559550642/insert-word.fifo',
                ReceiptHandle: message.ReceiptHandle,
              };

              this.sqs.deleteMessage(deleteParams, function(err, data) {
                if (err) {
                  console.log('Delete Error', err);
                } else {
                  console.log('Message Deleted', data);
                }
              });
            });
          })
          } else {
            this.logger.log('There is no message in queue');
          }
        });
      }, 5000);

      const count = await this.wordRepository.count();
      console.log("NUMBER OF WORDS: " + count);

    } catch (e) {
      console.error(e);
    }

  }
}
