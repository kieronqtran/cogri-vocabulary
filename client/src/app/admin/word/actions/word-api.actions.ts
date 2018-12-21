import { Action } from '@ngrx/store';
import { Word } from '../models/word';
import { WordPaginate } from '../models/paginate';
import { HttpErrorResponse } from '@angular/common/http';

export enum WordApiActionTypes {
  AddWordSuccess = '[Word/API] Add Words Success',
  AddWordFailure = '[Word/API] Add Words Failure',
  RemoveWordSuccess = '[Word/API] Remove Words Success',
  RemoveWordFailure = '[Word/API] Remove Words Failure',
  UpdateWordSuccess = '[Word/API] Update Words Success',
  UpdateWordFailure = '[Word/API] Update Words Failure',
  LoadWordSuccess = '[Word/API] Load Words Success',
  EmptyNextPage = '[Word/API] Empty Next Page',
  LoadWordFailure = '[Word/API] Load Words Failure',
}

export class AddWordsSuccess implements Action {
  readonly type = WordApiActionTypes.AddWordSuccess;
  constructor(public payload: Word) {}
}

export class AddWordsFailure implements Action {
  readonly type = WordApiActionTypes.AddWordFailure;
  constructor(public payload: { error: HttpErrorResponse }) {}
}

export class RemoveWordSuccess implements Action {
  readonly type = WordApiActionTypes.RemoveWordSuccess;
  constructor(public payload: { id: number }) {}
}

export class RemoveWordFailure implements Action {
  readonly type = WordApiActionTypes.RemoveWordFailure;
  constructor(public payload: { error: HttpErrorResponse }) {}
}

export class UpdateWordsSuccess implements Action {
  readonly type = WordApiActionTypes.UpdateWordSuccess;
  constructor(public payload: Word) {}
}

export class UpdateWordsFailure implements Action {
  readonly type = WordApiActionTypes.UpdateWordFailure;
  constructor(public payload: { error: HttpErrorResponse }) {}
}

export class EmptyNextPageSuccess implements Action {
  readonly type = WordApiActionTypes.EmptyNextPage;
}

export class LoadWordsSuccess implements Action {
  readonly type = WordApiActionTypes.LoadWordSuccess;
  constructor(public payload: WordPaginate) {}
}

export class LoadWordsFailure implements Action {
  readonly type = WordApiActionTypes.LoadWordFailure;
  constructor(public payload: { error: HttpErrorResponse }) {}
}

export type WordApiActions =
  | EmptyNextPageSuccess
  | LoadWordsSuccess
  | LoadWordsFailure
  | AddWordsSuccess
  | AddWordsFailure
  | RemoveWordSuccess
  | RemoveWordFailure
  | UpdateWordsSuccess
  | UpdateWordsFailure;
