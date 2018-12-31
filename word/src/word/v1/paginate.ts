export class Paginate<Entity> {
	kind: string;
	items: Entity[];
	nextPageToken: string;
	count: number;
	pageNum: number;
	totalPage: number;
}
