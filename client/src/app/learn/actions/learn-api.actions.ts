import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { NewRecord } from '../models/learn.model';

export enum LearnApiActionTypes {
  LoadLearnApis = '[LearnApi] Load LearnApis',
  LoadLearnApiFail = '[LearnApi] Load LearnApis Fail',
  RecordLearnApi = '[LearnApi] Insert Record',
  RecordLearnApiSuccess = '[LearnApi] Insert Record Success',
  RecordLearnApiFail = '[LearnApi] Insert Record Fail',
}

export class LoadLearnApis implements Action {
  readonly type = LearnApiActionTypes.LoadLearnApis;
}

export class LoadLearnApiFail implements Action {
  readonly type = LearnApiActionTypes.LoadLearnApiFail;
  constructor(public payload: { error: HttpErrorResponse }) {}
}

export class RecordLearnApi implements Action {
  readonly type = LearnApiActionTypes.RecordLearnApi;
  constructor(public payload: { entity: NewRecord }) {}
}

export class RecordLearnApiSuccess implements Action {
  readonly type = LearnApiActionTypes.RecordLearnApiSuccess;
}

export class RecordLearnApiFail implements Action {
  readonly type = LearnApiActionTypes.RecordLearnApiFail;
  constructor(public payload: { error: HttpErrorResponse }) {}
}

export type LearnApiActions = LoadLearnApis | LoadLearnApiFail;
