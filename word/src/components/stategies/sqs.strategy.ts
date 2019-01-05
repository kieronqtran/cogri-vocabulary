import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { SQS } from 'aws-sdk';

export class SQSTransport extends Server implements CustomTransportStrategy {
	constructor(options: {
		SQS: SQS,
	}) {
		super();
	}

	listen(callback: () => void) {
		throw new Error('Method not implemented.');
	}
	close() {
		throw new Error('Method not implemented.');
	}
}
