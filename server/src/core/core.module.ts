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
		CacheModule.registerAsync({ useClass: ConfigService }),
	],
	providers: [
		JwtStrategy,
		KeyCacheService,
	],
})
export class CoreModule {}
