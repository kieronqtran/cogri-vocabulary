import { Action } from '@ngrx/store';
import { Word } from '../models/word';

export enum WordPageActionTypes {
  LoadWordCollection = '[Word Page] Load Word Collection',
  LoadNextCollection = '[Word Page] Load Next Word Collection',
  LoadPreviousCollection = '[Word Page] Load Previous Word Collection',
  CreateOneWord = '[Word Page] Create One Word',
  UpdateOneWord = '[Word Page] Update One Word',
  DeleteOneWord = '[Word Page] Delete One Word',
  OpenCreateDialog = '[Word Page] Open Create Dialog',
  OpenUpdateDialog = '[Word Page] Open Update Dialog',
  OpenDeleteDialog = '[Word Page] Open Delete Dialog',
  OpenDeleteDialogCancelled = '[Word Page] Open Delete Dialog Cancelled',
}

export class ActionLoadWordPage implements Action {
  readonly type = WordPageActionTypes.LoadWordCollection;
}

export class ActionLoadNextPage implements Action {
  readonly type = WordPageActionTypes.LoadNextCollection;
}

export class ActionLoadPreviousPage implements Action {
  readonly type = WordPageActionTypes.LoadNextCollection;
}

export class ActionWordPageCreateOne implements Action {
  readonly type = WordPageActionTypes.CreateOneWord;
  constructor(public readonly payload: { entity: Word }) {}
}

export class ActionWordPageUpdateOne implements Action {
  readonly type = WordPageActionTypes.UpdateOneWord;
  constructor(public readonly payload: { entity: Word }) {}
}

export class ActionWordPageDeleteOne implements Action {
  readonly type = WordPageActionTypes.DeleteOneWord;
  constructor(public readonly payload: { id: number }) {}
}

export class LoadPreviousCollection implements Action {
  readonly type = WordPageActionTypes.LoadPreviousCollection;
}

export class ActionWordPageOpenUpdateDialog implements Action {
  readonly type = WordPageActionTypes.OpenUpdateDialog;
  constructor(public readonly payload: { id: number }) {}
}

export class ActionWordPageOpenDeleteDialog implements Action {
  readonly type = WordPageActionTypes.OpenDeleteDialog;
  constructor(public readonly payload: { id: number }) {}
}

export class ActionWordPageOpenDeleteDialogDismissed implements Action {
  readonly type = WordPageActionTypes.OpenDeleteDialogCancelled;
}

export class ActionWordPageOpenCreateDialog implements Action {
  readonly type = WordPageActionTypes.OpenCreateDialog;
}

export type WordPageActions =
  | ActionWordPageOpenDeleteDialog
  | ActionWordPageOpenCreateDialog
  | ActionWordPageOpenUpdateDialog
  | LoadPreviousCollection
  | ActionLoadNextPage
  | ActionLoadWordPage
  | ActionLoadPreviousPage
  | ActionWordPageUpdateOne
  | ActionWordPageDeleteOne;
