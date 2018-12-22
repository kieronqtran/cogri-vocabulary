import { Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

@Injectable()
export class SendEmailService {
	async sendEmails() {
		const service = new CognitoIdentityServiceProvider();
		const result = await service.listUsers().promise();

		result.Users;
	}
}
