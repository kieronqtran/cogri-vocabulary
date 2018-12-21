import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  toArray,
  withLatestFrom,
  tap,
} from 'rxjs/operators';

import { WordPageActions, WordApiActions } from '../actions';
import { WordService } from '../services/word.service';
import { LocalStorageService } from '@app/core';
import { WordPageActionTypes } from '../actions/word-page.actions';
import { State, getSelectParams, getWordEntitiesState } from '../reducers';

export const WORDS_COLLECTION_KEY = 'WORDS.COLLECTION';

@Injectable()
export class CollectionEffects {
  @Effect()
  loadWordCollection$ = this.actions$.pipe(
    ofType<WordPageActions.ActionLoadWordPage>(
      WordPageActionTypes.LoadWordCollection,
    ),
    withLatestFrom(this.store.pipe(select(getSelectParams))),
    switchMap(([_, { maxResults }]) =>
      this.wordService.get({ maxResults }).pipe(
        map(e => new WordApiActions.LoadWordsSuccess(e)),
        catchError(e => of(new WordApiActions.LoadWordsFailure(e))),
      ),
    ),
    // tap(() => {
    // 	this.store.pipe(select(getWordEntitiesState)).toPromise().then(state =>
    // 		this.localStorageService.setItem(WORDS_COLLECTION_KEY, state)
    // 	);
    // }),
  );

  @Effect({ dispatch: true })
  loadNextPageCollection$ = this.actions$.pipe(
    ofType<WordPageActions.ActionLoadNextPage>(
      WordPageActionTypes.LoadNextCollection,
    ),
    withLatestFrom(this.store.pipe(select(getWordEntitiesState))),
    switchMap(
      ([_, state]): Observable<
        | WordApiActions.EmptyNextPageSuccess
        | WordApiActions.LoadWordsSuccess
        | WordApiActions.LoadWordsFailure
      > => {
        const currentPage = state.pagination.currentPageNum;
        const { nextPageToken } = state.pagination.pages[currentPage];
        if (!nextPageToken && state.loaded) {
          return of(new WordApiActions.EmptyNextPageSuccess());
        }
        return this.wordService.get({ nextPageToken }).pipe(
          map(e => new WordApiActions.LoadWordsSuccess(e)),
          catchError(e => of(new WordApiActions.LoadWordsFailure(e))),
        );
      },
    ),
    // tap(() => {
    // 	this.store.pipe(select(getWordEntitiesState)).toPromise().then((state) => {
    // 		this.localStorageService.setItem(WORDS_COLLECTION_KEY, state);
    // 	});
    // }),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly localStorageService: LocalStorageService,
    private readonly wordService: WordService,
    private readonly store: Store<State>,
  ) {}
}
