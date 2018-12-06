import { Module, HttpModule, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { JwtAuthGuard } from './components/guard/auth.guard';

@Module({
  imports: [
		CoreModule,
	],
  controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
