import { Word } from './word';

export interface WordPaginate extends Paginate<Word> {}

export interface Paginate<Entity> {
  items: Entity[];
  totalPage: number;
  nextPageToken: string | null;
  count: number;
  pageNum: number;
  kind: string;
}

export interface PaginateMetadata<EntityId> {
  pageSize: number;
  totalPage: number;
  count: number;
  currentPageNum: number;
  pages: {
    [id: string]: {
      nextPageToken: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      ids: EntityId[];
      loading: boolean;
      loaded: boolean;
      lastUpdatedTime: number;
    };
  };
}
