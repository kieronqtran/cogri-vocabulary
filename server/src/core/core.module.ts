import * as redisStore from 'cache-manager-redis-store';
import { Module, Global, HttpModule, CacheModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './auth/jwt.strategy';
import { KeyCacheService } from './auth/key-cache.service';
import { ConfigService } from './config/config.service';

@Global()
@Module({
	imports: [
		PassportModule.registerAsync({ useClass: ConfigService }),
		TypeOrmModule.forRootAsync({ useClass: ConfigService }),
		HttpModule.register({}),
		CacheModule.registerAsync({
			useFactory: async () => {
				return {
					store: redisStore,
					host: 'localhost',
					port: 6379,
					ttl: 5,
				};
			},
		}),
	],
	providers: [
		JwtStrategy,
		KeyCacheService,
	],
})
export class CoreModule {}
