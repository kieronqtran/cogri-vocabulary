import { FindManyOptions, FindConditions } from 'typeorm';
import { Paginate } from './paginate';
export abstract class FindOptionBuilder<Entity> {
	abstract get items(): Entity[];
	abstract setItems(entities: Entity[]): void;
	abstract buildFindOption(): FindManyOptions<Entity> | FindConditions<Entity>;
	abstract buildResult(): Paginate<Entity>;
}
