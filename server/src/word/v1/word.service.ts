import { Injectable } from '@nestjs/common';
import { WordRepository } from './word.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWordDto, UpdateWordDto } from './word.dto';
import { Raw, IsNull, SelectQueryBuilder } from 'typeorm';
import { GetAllOptions } from './get-all-options';
import { Word } from './word.entity';

@Injectable()
export class WordService {
	constructor(
		@InjectRepository(WordRepository) private readonly wordRepository: WordRepository,
	) {}

	async getARandomWord() {
		// Can't use queryBuilder or normal find method for this get random rows
		const query = `SELECT DISTINCT * FROM word WHERE deleted_at IS NULL ORDER BY RAND() LIMIT 10`;
		const builder = await this.wordRepository.manager.query(query);
		return builder.map(e => {
			const word = new Word();
			word.id = e.id;
			word.word = e.word;
			word.vietnameseMeaning = e.vietnamese_meaning;
			word.similarWords = JSON.parse(e.similar_words);
			word.examples = JSON.parse(e.examples);
			word.createdAt = e.created_at;
			word.updatedAt = e.updated_at;
			return word;
		});
	}

	async getById(id: string) {
		return this.wordRepository.findOneOrFail(id, {
			where: {
				deletedAt: IsNull(),
			},
		});
	}

	async get(options = new GetAllOptions()) {
		if (!(options instanceof GetAllOptions)) {
			options = new GetAllOptions(options);
		}
		const query = options.buildFindOption();
		if (options.nextPageToken) {
			const entities = await this.wordRepository.find(query);
			options.setItems(entities);
		} else {
			const [entities, counted] = await this.wordRepository.findAndCount(query);
			options
				.setItems(entities)
				.setCounted(counted);
		}
		return options.buildResult();
	}

	async create(entity: CreateWordDto) {
		const result = await this.wordRepository.insert(entity);
		const id = result.identifiers.shift();
		return this.wordRepository.findOne(id);
	}

	async update(id: string, entity: UpdateWordDto) {
		const result = await this.wordRepository.update(id, entity);
		return this.wordRepository.findOne(id);
	}

	async patch(id: string, entity: UpdateWordDto) {
		const result = await this.wordRepository.findOneOrFail(id);
		const merged = this.wordRepository.merge(result, entity);
		const updated = await this.wordRepository.update(merged.id, merged);
		return merged;
	}

	async delete(id: string) {
		await this.wordRepository.update(id, {
			deletedAt: new Date(),
		});
	}
}
