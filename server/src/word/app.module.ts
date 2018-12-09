import { Module } from '@nestjs/common';
import { WordModule as WordV1Module } from './v1/word.module';

@Module({
	imports: [WordV1Module],
})
export class AppModule {}
