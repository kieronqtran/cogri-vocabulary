import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromCollection from './words.reducer';
import * as fromRoot from '@app/core/core.state';

export interface WordState {
  list: fromCollection.State;
}

export interface State extends fromRoot.AppState {
  words: fromCollection.State;
}

export const reducers: ActionReducerMap<WordState> = {
  list: fromCollection.reducer,
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getWordsState = createFeatureSelector<State, WordState>('words');

// /**
//  * Every reducer module exports selector functions, however child reducers
//  * have no knowledge of the overall state tree. To make them usable, we
//  * need to make new selectors that wrap them.
//  *
//  * The createSelector function creates very efficient selectors that are memoized and
//  * only recompute when arguments change. The created selectors can also be composed
//  * together to select different pieces of state.
//  */
export const getWordEntitiesState = createSelector(
  getWordsState,
  state => state.list,
);

// export const getSelectedBookId = createSelector(
//   getBookEntitiesState,
//   fromBooks.getSelectedId
// );

// /**
//  * Adapters created with @ngrx/entity generate
//  * commonly used selector functions including
//  * getting all ids in the record set, a dictionary
//  * of the records by id, an array of records and
//  * the total number of records. This reduces boilerplate
//  * in selecting records from the entity state.
//  */
export const {
  selectIds: selectWordIds,
  selectEntities: selectWordEntities,
  selectAll: selectAllWords,
  selectTotal: selectTotalWords,
} = fromCollection.wordAdapter.getSelectors(getWordEntitiesState);

export const getSelectParams = createSelector(
  getWordEntitiesState,
  state => state.searchParams,
);

// export const getSelectedBook = createSelector(
//   getBookEntities,
//   getSelectedBookId,
//   (entities, selectedId) => {
//     return selectedId && entities[selectedId];
//   }
// );

// /**
//  * Just like with the books selectors, we also have to compose the search
//  * reducer's and collection reducer's selectors.
//  */
// export const getSearchState = createSelector(
//   getBooksState,
//   (state: BooksState) => state.search
// );

// export const getSearchBookIds = createSelector(
//   getSearchState,
//   fromSearch.getIds
// );
// export const getSearchQuery = createSelector(
//   getSearchState,
//   fromSearch.getQuery
// );
// export const getSearchLoading = createSelector(
//   getSearchState,
//   fromSearch.getLoading
// );
// export const getSearchError = createSelector(
//   getSearchState,
//   fromSearch.getError
// );

// /**
//  * Some selector functions create joins across parts of state. This selector
//  * composes the search result IDs to return an array of books in the store.
//  */
// export const getSearchResults = createSelector(
//   getBookEntities,
//   getSearchBookIds,
//   (books, searchIds) => {
//     return searchIds.map(id => books[id]);
//   }
// );

// export const getCollectionState = createSelector(
//   getBooksState,
//   (state: BooksState) => state.collection
// );

// export const getCollectionLoaded = createSelector(
//   getCollectionState,
//   fromCollection.getLoaded
// );
// export const getCollectionLoading = createSelector(
//   getCollectionState,
//   fromCollection.getLoading
// );
// export const getCollectionBookIds = createSelector(
//   getCollectionState,
//   fromCollection.getIds
// );

// export const getBookCollection = createSelector(
//   getBookEntities,
//   getCollectionBookIds,
//   (entities, ids) => {
//     return ids.map(id => entities[id]);
//   }
// );

// export const isSelectedBookInCollection = createSelector(
//   getCollectionBookIds,
//   getSelectedBookId,
//   (ids, selected) => {
//     return selected && ids.indexOf(selected) > -1;
//   }
// );
