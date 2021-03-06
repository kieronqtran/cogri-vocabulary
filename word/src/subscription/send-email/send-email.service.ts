import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
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
	) { }

	async onModuleInit() {
		await this.startJob();
	}

	async startJob() {
		const { defaultCron, processes = 1, tz = 'Etc/UTC' } = this.config;

		this.sendEmailQueue.process(processes, sendEmailJob);
		const self = this;

		this.cornQueue.process(async (job: Bull.Job<{ email: string; name: string }[]>) => {

		  const emailLists = await this.getUsers();

		  emailLists.forEach(({email, name}) => {
				self.logger.log(`Create a job to send email to ${email}`);

				const subject = `[Cogri Vocabulary] Hello ${name}!`;
				const context = {};

				self.sendEmailQueue.add({
					context,
					template,
					to: email,
					subject,
				}, {
					removeOnComplete: true,
					attempts: 5,
				});
			});

		});

		// Make sure there is only 1 cron job
		const counted = await this.cornQueue.getRepeatableJobs();
		const job = counted.pop();

		this.logger.log(`${job.name} sending email job is running`);

		if (!job) {
			this.cornQueue.add(null, { repeat: { cron: defaultCron , tz }});
		}
		if (job.cron !== defaultCron) {
			await this.cornQueue.removeRepeatable({
				jobId: job.id,
				cron: job.cron,
				tz: job.tz,
			});
			this.cornQueue.add(null, { repeat: { cron: defaultCron , tz }});
		}
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
