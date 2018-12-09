import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { WordRepository } from './word.repository';
import { WordService } from './word.service';
import { WordController } from './word.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([Word, WordRepository]),
	],
	providers: [WordService],
	controllers: [WordController],
})
export class WordModule {}
