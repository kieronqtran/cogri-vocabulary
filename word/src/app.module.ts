import { Module, HttpModule, CacheInterceptor } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { JwtAuthGuard } from './components/guard/auth.guard';
import { AppModule as WordModule } from './word/app.module';
import { ConfigService } from './core';
import { RouterModule } from 'nest-router';
import { routes } from './routes';

@Module({
  imports: [
		CoreModule,
		WordModule,
		HttpModule,
		RouterModule.forRoutes(routes),
	],
	providers: [
		{
			provide: ConfigService,
      useValue: new ConfigService(),
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
	],
})
export class AppModule {}
