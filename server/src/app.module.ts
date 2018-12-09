import { Module, HttpModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
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
	],
})
export class AppModule {}
