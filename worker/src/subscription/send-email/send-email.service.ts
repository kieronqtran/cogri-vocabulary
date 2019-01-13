import { Injectable, Inject, OnModuleInit, HttpService } from '@nestjs/common';
import * as Bull from 'bull';
import { Queue } from 'bull';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { SubscriptionModuleOptions } from '../interface/subscription-options.interface';
import { SendEmailSubscriptionData } from '../interface/send-email-subscription-data';
import { SUBSCRIPTION_MODULE_OPTIONS, SUBSCRIPTION_KEY_METADATA, SUBSCRIPTION_JOB } from '../subscription.constants';
import { LoggerService } from '../../core';
import { template } from '../template';
import sendEmailJob = require('../send-mail.job');

@Injectable()
export class SendEmailService implements OnModuleInit {
	private readonly logger = LoggerService.createLogger(SendEmailService.name);

	private readonly sendEmailQueue: Queue<SendEmailSubscriptionData> = new Bull(`${this.queueName}:send-email`, { redis: this.config.redis });
	private readonly cornQueue: Queue<{ email: string; name: string }[]> = new Bull(`${this.queueName}:corn`, { redis: this.config.redis });

	constructor(
		@Inject(SUBSCRIPTION_MODULE_OPTIONS) private readonly config: SubscriptionModuleOptions,
		@Inject(SUBSCRIPTION_JOB) private readonly queueName: string,
    private readonly httpService: HttpService
	) {
	  console.log(queueName);
  }

	async onModuleInit() {
		await this.startJob();
	}

	async startJob() {
		const { defaultCron, processes = 1, tz = 'Etc/UTC' } = this.config;

		this.sendEmailQueue.process(sendEmailJob);
		const self = this;

		this.cornQueue.process(async (job: Bull.Job<{ email: string; name: string }[]>) => {

		  const emailLists = await this.getUsers();

		  const promises = emailLists.map(async ({email, name}) => {
				self.logger.log(`Create a job to send email to ${email}`);

        const prediction = await this.machineLearning(email);
        this.logger.log(JSON.stringify(prediction, null, 2));

        var point = parseFloat(prediction["Prediction"]["predictedValue"]);
        var mark = Math.round(point);

        if (mark >= 50){
          mark = 48;
        }
        else if (mark < 25){
          mark = Math.round(mark * 1.5);
        }
        else if (mark < 10){
          mark = mark * 3;
        }
        else {
          mark = mark;
        }

        const encouragement = "If you continue with your current learning progress, next week, you will get " + mark + " over 50 points.";

				const subject = `[Cogri Vocabulary] Hello ${name}!`;
				const context = {};

				await self.sendEmailQueue.add({
					context,
					template: encouragement,
					to: email,
					subject,
				}, {
					removeOnComplete: true,
					attempts: 5,
				});
			});
      await Promise.all(promises);
		});

		// Make sure there is only 1 cron job
		const counted = await this.cornQueue.getRepeatableJobs();
		const job = counted.pop();
    let newJob;
		if (!job) {
			newJob = this.cornQueue.add(null, {
			  repeat: {
			    cron: defaultCron ,
          tz
			  },
        removeOnComplete: true,
			}).catch(err => console.log(err));
		}
		if (job && job.cron !== defaultCron) {
			await this.cornQueue.removeRepeatable({
				jobId: job.id,
				cron: job.cron,
				tz: job.tz,
			});
			this.cornQueue.add(null, {
			  repeat: {
			    cron: defaultCron ,
          tz
			  },
        removeOnComplete: true,
			}).catch(err => console.log(err));
		}

    this.cornQueue.on('error', (error) => {
      console.error(error);
    })

    this.sendEmailQueue.on('error', (error) => {
      console.error(error);
    })

    this.logger.log(`${JSON.stringify(job)} sending email job is running`);

  }

	async machineLearning(email: string){
	  const param = {"email" : email};
    const response = await this.httpService
      .post('https://jt7rncob6h.execute-api.us-east-1.amazonaws.com/TestingPost', param)
      .toPromise();
    return response.data;
  }

	async getUsers() {
		const { aws: { region, userPoolId, credentials } } = this.config;
		const identity = new CognitoIdentityServiceProvider({
			credentials,
			region,
		});
		const params: CognitoIdentityServiceProvider.Types.ListUsersRequest = {
			UserPoolId: userPoolId,
			AttributesToGet: ['email', 'name'],
		};
		const emailSet = {};
		const { Users } = await identity.listUsers(params).promise();
		for (const user of Users) {
			const email = user.Attributes.reduce<any>((pre, cur) => {
				return {
					...pre,
					[cur.Name]: cur.Value,
				};
			}, {});
			emailSet[email.email] = email;
		}
		return Object.values(emailSet) as { email: string; name: string }[];
	}
}
