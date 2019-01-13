import { Module, Global, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from './config/config.service';
import { SubscriptionModule } from '../subscription/subscription.module';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({ useClass: ConfigService }),

		// SubscriptionModule.registerAsync({ useClass: ConfigService }),
		HttpModule.registerAsync({
			// @ts-ignore
			useClass: ConfigService,
		}),
	],
	providers: [],
})
export class CoreModule {}
