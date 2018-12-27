import { Module, Global, HttpModule, CacheModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nest-modules/mailer';
import { JwtStrategy } from './auth/jwt.strategy';
import { KeyCacheService } from './auth/key-cache.service';
import { ConfigService } from './config/config.service';
import { SubscriptionModule } from '../subscription/subscription.module';

@Global()
@Module({
	imports: [
		PassportModule.registerAsync({ useClass: ConfigService }),
		TypeOrmModule.forRootAsync({ useClass: ConfigService }),
		CacheModule.registerAsync({ useClass: ConfigService }),
		SubscriptionModule.registerAsync({ useClass: ConfigService }),
		HttpModule.registerAsync({
			// @ts-ignore
			useClass: ConfigService,
		}),
	],
	providers: [
		JwtStrategy,
		KeyCacheService,
	],
})
export class CoreModule {}
