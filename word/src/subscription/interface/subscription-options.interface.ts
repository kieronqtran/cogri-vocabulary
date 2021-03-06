import { ModuleMetadata, Type, Provider } from '@nestjs/common/interfaces';
import { Credentials } from 'aws-sdk';
import * as Queue from 'bull';

export interface SubscriptionModuleOptions {
	email: string;
	redis: Queue.QueueOptions['redis'];
	aws: {
		credentials: Credentials,
		region: string,
		userPoolId: string,
	};
	mailer: {
    transport?: any;
    defaults?: any;
  };
	defaultCron: string;
	queueKey?: string;
	processes?: number;
	tz?: string;
}

export interface SubscriptionOptionsFactory {
	createSubscriptionOptions(): Promise<SubscriptionModuleOptions> | SubscriptionModuleOptions;
}

export interface SubscriptionModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useExisting?: Type<SubscriptionOptionsFactory>;
	useClass?: Type<SubscriptionOptionsFactory>;
	useFactory?: (...args: any[]) => Promise<SubscriptionModuleOptions> | SubscriptionModuleOptions;
	inject?: any[];
  extraProviders?: Provider[];
}
