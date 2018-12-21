import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
  Update,
} from '@ngrx/entity';
import * as compareDesc from 'date-fns/compare_desc';
import { Word } from '../models/word';
import { WordApiActions, WordPageActions } from '../actions';
import { PaginateMetadata } from '../models/paginate';
import { HttpErrorResponse } from '@angular/common/http';

export interface State extends EntityState<Word> {
  loaded: boolean;
  loading: boolean;
  pagination: PaginateMetadata<string>;
  searchParams: { maxResults: number };
  error: HttpErrorResponse;
}

export const wordAdapter: EntityAdapter<Word> = createEntityAdapter<Word>({
  selectId: (word: Word) => word.id,
  sortComparer: (a, b) => compareDesc(a.createdAt, b.createdAt),
});

export const initialState: State = wordAdapter.getInitialState<State>({
  ids: [],
  entities: {},
  loaded: false,
  loading: false,
  searchParams: {
    maxResults: 25,
  },
  pagination: null,
  error: null,
});

export function reducer(
  state: State = initialState,
  action: WordApiActions.WordApiActions | WordPageActions.WordPageActions,
): State {
  switch (action.type) {
    case WordApiActions.WordApiActionTypes.EmptyNextPage: {
      return {
        ...state,
      };
    }
    case WordPageActions.WordPageActionTypes.LoadPreviousCollection: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPageNum: state.pagination.currentPageNum - 1,
        },
      };
    }
    case WordPageActions.WordPageActionTypes.LoadNextCollection: {
      return {
        ...state,
        loading: true,
        loaded: false,
        pagination: {
          ...state.pagination,
          pages: {
            ...state.pagination.pages,
            [state.pagination.currentPageNum + 1]: {
              ids: [],
              nextPageToken: null,
              hasNextPage: false,
              hasPreviousPage: false,
              loading: true,
              loaded: false,
              lastUpdatedTime: null,
            },
          },
        },
      };
    }
    case WordPageActions.WordPageActionTypes.LoadWordCollection: {
      return {
        ...state,
        loading: true,
        loaded: false,
        pagination: {
          pageSize: state.searchParams.maxResults,
          totalPage: 0,
          currentPageNum: 0,
          count: 0,
          pages: {
            0: {
              ids: [],
              nextPageToken: null,
              hasNextPage: false,
              hasPreviousPage: false,
              loading: true,
              loaded: false,
              lastUpdatedTime: null,
            },
          },
        },
      };
    }
    case WordApiActions.WordApiActionTypes.LoadWordSuccess: {
      const {
        items,
        nextPageToken,
        totalPage,
        pageNum,
        count,
      } = action.payload;
      const newState: State = {
        ...state,
        loaded: true,
        loading: false,
        pagination: {
          pageSize: state.pagination.pageSize,
          totalPage,
          currentPageNum: pageNum,
          count,
          pages: {
            ...state.pagination.pages,
            [pageNum]: {
              ids: items.map(e => e.id),
              nextPageToken,
              hasNextPage: !!nextPageToken,
              hasPreviousPage: pageNum !== 1,
              loading: false,
              loaded: true,
              lastUpdatedTime: Date.now(),
            },
          },
        },
      };
      return wordAdapter.addMany(items, newState);
    }
    case WordApiActions.WordApiActionTypes.LoadWordFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case WordApiActions.WordApiActionTypes.AddWordSuccess: {
      return wordAdapter.addOne(action.payload, state);
    }
    case WordApiActions.WordApiActionTypes.AddWordFailure: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case WordApiActions.WordApiActionTypes.UpdateWordSuccess: {
      const updatedEntity: Update<Word> = {
        id: action.payload.id,
        changes: action.payload,
      };
      return wordAdapter.updateOne(updatedEntity, state);
    }
    case WordApiActions.WordApiActionTypes.UpdateWordFailure: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case WordApiActions.WordApiActionTypes.RemoveWordSuccess: {
      return wordAdapter.removeOne(action.payload.id, state);
    }
    case WordApiActions.WordApiActionTypes.RemoveWordFailure: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
