import { Injectable } from '@nestjs/common';
import { WordRepository } from './word.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWordDto, UpdateWordDto } from './word.dto';
import { Raw } from 'typeorm';
import { GetAllOptions } from './get-all-options';

@Injectable()
export class WordService {
	constructor(
		@InjectRepository(WordRepository) private readonly wordRepository: WordRepository,
	) {}

	async getById(id: string) {
		return this.wordRepository.findOneOrFail(id, {
			where: {
				deletedAt: (alias) => Raw(`${alias} IS NULL OR ${alias} > ${new Date().toISOString()}`),
			},
		});
	}

	async get(options = new GetAllOptions()) {
		if (!(options instanceof GetAllOptions)) {
			options = new GetAllOptions(options);
		}
		const query = options.buildFindOption();
		const [entities, counted] = await this.wordRepository.findAndCount(query);
		const result = options
			.setItems(entities)
			.setCounted(counted)
			.buildResult();
		return result;
	}

	async create(entity: CreateWordDto) {
		return this.wordRepository.insert(entity);
	}

	async update(id: string, entity: UpdateWordDto) {
		return this.wordRepository.update(id, entity);
	}

	async delete(id: string) {
		return this.wordRepository.delete(id);
	}
}
