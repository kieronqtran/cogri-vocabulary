import { Job } from 'bull';
import * as handlebars from 'handlebars';
import { ConfigService, LoggerService } from '../core';
import { SendEmailSubscriptionData } from './interface/send-email-subscription-data';

const configService = new ConfigService();
const logger = LoggerService.createLogger(`SendEmailJob`);
export = async (job: Job<SendEmailSubscriptionData>) => {
	const { template: emailTemplate, context: emailContext, to, subject } = job.data;
	const { mailer, email } = configService.createSubscriptionOptions();
	const template = handlebars.compile(emailTemplate);
	const emailHtml = template(emailContext);
	try {
		await mailer.transport.sendMail({
			from: email,
			to,
			subject,
			html: emailHtml,
		});
		logger.log(`Send email to ${to} successful`);
	} catch (error) {
		logger.error('Send email failed', error);
	}
};
