import { EntityRepository, Repository, ObjectID, FindOneOptions, FindConditions } from 'typeorm';
import { Word } from './word.entity';

@EntityRepository(Word)
export class WordRepository extends Repository<Word> {
}
