import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Learn } from '../models/learn.model';
import { Word } from '@app/admin/word/models/word';

export enum LearnActionTypes {
  LoadLearns = '[Learn] Load Learns',
  AddLearn = '[Learn] Add Learn',
  UpsertLearn = '[Learn] Upsert Learn',
  AddLearns = '[Learn] Add Learns',
  UpsertLearns = '[Learn] Upsert Learns',
  UpdateLearn = '[Learn] Update Learn',
  UpdateLearns = '[Learn] Update Learns',
  DeleteLearn = '[Learn] Delete Learn',
  DeleteLearns = '[Learn] Delete Learns',
  ClearLearns = '[Learn] Clear Learns',
}

export class LoadLearns implements Action {
  readonly type = LearnActionTypes.LoadLearns;

  constructor(public payload: { learns: Word[] }) {}
}

export class AddLearn implements Action {
  readonly type = LearnActionTypes.AddLearn;

  constructor(public payload: { learn: Word }) {}
}

export class UpsertLearn implements Action {
  readonly type = LearnActionTypes.UpsertLearn;

  constructor(public payload: { learn: Word }) {}
}

export class AddLearns implements Action {
  readonly type = LearnActionTypes.AddLearns;

  constructor(public payload: { learns: Word[] }) {}
}

export class UpsertLearns implements Action {
  readonly type = LearnActionTypes.UpsertLearns;

  constructor(public payload: { learns: Word[] }) {}
}

export class UpdateLearn implements Action {
  readonly type = LearnActionTypes.UpdateLearn;

  constructor(public payload: { learn: Update<Word> }) {}
}

export class UpdateLearns implements Action {
  readonly type = LearnActionTypes.UpdateLearns;

  constructor(public payload: { learns: Update<Word>[] }) {}
}

export class DeleteLearn implements Action {
  readonly type = LearnActionTypes.DeleteLearn;

  constructor(public payload: { id: number }) {}
}

export class DeleteLearns implements Action {
  readonly type = LearnActionTypes.DeleteLearns;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearLearns implements Action {
  readonly type = LearnActionTypes.ClearLearns;
}

export type LearnActions =
  | LoadLearns
  | AddLearn
  | UpsertLearn
  | AddLearns
  | UpsertLearns
  | UpdateLearn
  | UpdateLearns
  | DeleteLearn
  | DeleteLearns
  | ClearLearns;
