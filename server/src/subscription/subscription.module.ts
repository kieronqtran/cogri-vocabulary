import { Module, DynamicModule, Provider } from '@nestjs/common';
import { SubscriptionModuleOptions, SubscriptionModuleAsyncOptions, SubscriptionOptionsFactory } from './interface/subscription-options.interface';
import { SUBSCRIPTION_MODULE_OPTIONS, SUBSCRIPTION_JOB, SUBSCRIPTION_KEY_METADATA } from './subscription.constants';
import { MailerModule } from '@nest-modules/mailer';
import { ConfigService } from '../core';
import { SendEmailService } from './send-email/send-email.service';

@Module({
	imports: [
		MailerModule.forRootAsync({ useClass: ConfigService }),
	],
	providers: [
		SendEmailService,
		{
			provide: SUBSCRIPTION_JOB,
			useValue: SUBSCRIPTION_KEY_METADATA,
		},
	],
})
export class SubscriptionModule {
	static register(options: SubscriptionModuleOptions): DynamicModule {
    return {
      module: SubscriptionModule,
      providers: [{ provide: SUBSCRIPTION_MODULE_OPTIONS, useValue: options }],
      exports: [SUBSCRIPTION_MODULE_OPTIONS],
    };
  }

  static registerAsync(options: SubscriptionModuleAsyncOptions): DynamicModule {
    return {
      module: SubscriptionModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
      exports: [SUBSCRIPTION_MODULE_OPTIONS],
    };
  }

  private static createAsyncProviders(
    options: SubscriptionModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
			},
			...(options.extraProviders || []),
    ];
  }

  private static createAsyncOptionsProvider(
    options: SubscriptionModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: SUBSCRIPTION_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
		}
    return {
      provide: SUBSCRIPTION_MODULE_OPTIONS,
      useFactory: async (optionsFactory: SubscriptionOptionsFactory) =>
        await optionsFactory.createSubscriptionOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
