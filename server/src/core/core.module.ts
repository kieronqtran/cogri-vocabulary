import { Module, Global, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { KeyCacheService } from './auth/key-cache.service';
import { ConfigService } from './config/config.service';
import { LoggerService } from './logger/logger.service';

@Global()
@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt', session: false }),
		HttpModule,
	],
	providers: [
		JwtStrategy,
		KeyCacheService,
    {
      provide: ConfigService,
      useValue: new ConfigService('.env'),
		},
		LoggerService,
	],
	exports: [ConfigService],
})
export class CoreModule {}
