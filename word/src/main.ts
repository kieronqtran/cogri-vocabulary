import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');
import { ConfigService, LoggerService } from './core';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const logger = new Logger('Main');
	const app = await NestFactory.create(AppModule);
	// NestFactory.createMicroservice(AppModule, {
	// 	strategy: new SQSTransport(),
	// });
	app.use(cookieParser());
	app.set('trust proxy', true);
	const port = app.get(ConfigService).get('PORT') || 3000;
	app.listen(port, () => {
		logger.log(`Application run on port: ${port}`);
	});
}
bootstrap();
