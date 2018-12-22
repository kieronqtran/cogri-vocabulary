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
		const builder = this.wordRepository.createQueryBuilder('word1');
		builder.innerJoin((qb: SelectQueryBuilder<Word>) => {
			const builder2 = this.wordRepository.createQueryBuilder('id')
				.select('MAX(id)');
			qb.select(`CEIL(RAND() * ${builder2.getSql()})`);
			return qb.subQuery();
		}, 'word2');
		builder.where('word1.id >= word2.id');
		builder.orderBy('id', 'ASC');
		return builder.getOne();
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
