import { FindManyOptions } from 'typeorm';
import { Word } from './word.entity';
import { Paginate } from './paginate';
import { FindOptionBuilder } from './find-option-builder';

type OrderBy = {
	[key in keyof Word]?: 'ASC'  | 'DESC';
};

export class GetAllOptions extends FindOptionBuilder<Word> {
	private _items: Word[] = [];
	private _counted = 0;
	private _maxResults = 20;
	private _nextPageToken: string;
	private _currentPage: number = 0;
	private _query: string;
	private _orderBy: OrderBy = { createdAt: 'DESC' };
	private _cursor: string;

	constructor(options?: GetAllOptions) {
		super();
		Object.assign(this, options);
	}

	get nextPageToken() {
		return this._nextPageToken;
	}

	set nextPageToken(value: string) {
		this.setNextPageToken(value);
	}

	setNextPageToken(value: string) {
		this._nextPageToken = value;
		return this;
	}

	get maxResults() {
		return this._maxResults;
	}

	set maxResults(value: number) {
		this.setMaxResults(value);
	}

	setMaxResults(value: number) {
		this._maxResults = value;
		return this;
	}

	get items(): Word[] {
		return this._items;
	}

	set items(value: Word[]) {
		this._items = value;
	}

	setItems(entities: Word[]) {
		this._items = entities;
		return this;
	}

	get counted() {
		return this._counted;
	}

	set counted(value: number) {
		this.setCounted(value);
	}

	setCounted(value: number) {
		this._counted = value;
		return this;
	}

	setQuery(value: string) {
		this._query = value;
		return this;
	}

	setOrderBy(value: OrderBy | string  = { createdAt: 'DESC' }) {
		if (typeof value === 'string') {
			value = value.split(',').reduce((pre, cur) => {
				const key = cur.split(' ');
				return pre[key[0]] = key[1] ? 'DESC' : 'ASC';
			}, {}) as { [key in keyof Word]: 'ASC' | 'DESC' };
		}
		this._orderBy = value;
		return this;
	}

	addOrderBy(value: OrderBy) {
		this._orderBy = {
			...this._orderBy,
			...value,
		};
	}

	buildFindOption(): FindManyOptions<Word> {
		this.decodeNextPageToken();
		return {
			// TODO: convert from offset/limit pagination to cursor pagination
			skip: this._maxResults * this._currentPage,
			take: this._maxResults,
			order: this._orderBy,
		};
	}

	buildResult(): Paginate<Word> {
		const result = new Paginate<Word>();
		result.items = this.items;
		result.totalPage = Math.ceil(this._counted / this._maxResults);
		result.nextPageToken = this.encodeNextPageToken();
		result.count = this._counted;
		result.pageNum = this._currentPage;
		result.kind = 'Word';
		return result;
	}

	private decodeNextPageToken() {
		if (!this._nextPageToken) {
			return;
		}
		const decodedToken = Buffer.from(this._nextPageToken, 'base64').toString('ascii');
		const nextPageObject = JSON.parse(decodedToken);
		this._cursor = nextPageObject.cursor;
		this._maxResults = nextPageObject.maxResults;
		this._currentPage = nextPageObject.currentPage + 1;
		this._query = nextPageObject.query;
		this._orderBy = nextPageObject.orderBy;
	}

	private encodeNextPageToken(): string {
		this._cursor = (this._items[this._items.length - 1] || { id: undefined }).id;
		const nextPageObject = {
			cursor: this._cursor,
			maxResults: this._maxResults,
			currentPage: this._currentPage,
			query: this._query,
			orderBy: this._orderBy,
		};
		return Buffer.from(JSON.stringify(nextPageObject)).toString('base64');
	}
}
