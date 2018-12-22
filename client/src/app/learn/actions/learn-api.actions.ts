import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum LearnApiActionTypes {
  LoadLearnApis = '[LearnApi] Load LearnApis',
  LoadLearnApiFail = '[LearnApi] Load LearnApis Fail',
}

export class LoadLearnApis implements Action {
  readonly type = LearnApiActionTypes.LoadLearnApis;
}

export class LoadLearnApiFail implements Action {
  readonly type = LearnApiActionTypes.LoadLearnApiFail;
  constructor(public payload: { error: HttpErrorResponse }) {}
}

export type LearnApiActions = LoadLearnApis | LoadLearnApiFail;
