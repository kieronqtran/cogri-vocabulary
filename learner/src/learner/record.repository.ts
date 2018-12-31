import { EntityRepository, Repository, ObjectID, FindOneOptions, FindConditions } from 'typeorm';
import { Word } from './record.entity';

@EntityRepository(Word)
export class RecordRepository extends Repository<Word> {}
