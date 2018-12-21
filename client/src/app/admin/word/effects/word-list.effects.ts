import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material';
import { NotificationService } from '@app/core';
import { WordPageActions } from '../actions';
import {
  exhaustMap,
  map,
  withLatestFrom,
  switchMap,
  catchError,
  tap,
} from 'rxjs/operators';
import { UpdateDialogComponent } from '../containers/update-dialog/update-dialog.component';
import { Word } from '../models/word';
import {
  ActionWordPageUpdateOne,
  ActionWordPageDeleteOne,
  ActionWordPageOpenDeleteDialogDismissed,
} from '../actions/word-page.actions';
import { DeleteDialogComponent } from '../containers/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from '../containers/create-dialog/create-dialog.component';
import { Store, select } from '@ngrx/store';
import { State, getWordEntitiesState } from '../reducers';
import { WordService } from '../services/word.service';
import {
  UpdateWordsSuccess,
  UpdateWordsFailure,
  AddWordsSuccess,
  AddWordsFailure,
  RemoveWordSuccess,
  RemoveWordFailure,
} from '../actions/word-api.actions';
import { of } from 'rxjs';

@Injectable()
export class WordListEffects {
  @Effect({ dispatch: false })
  openUpdateDialog$ = this.actions$.pipe(
    ofType<WordPageActions.ActionWordPageOpenUpdateDialog>(
      WordPageActions.WordPageActionTypes.OpenUpdateDialog,
    ),
    withLatestFrom(this.store.pipe(select(getWordEntitiesState))),
    exhaustMap(([action, state]) => {
      const entity = state.entities[action.payload.id];
      const dialogRef = this.dialog.open(UpdateDialogComponent, {
        width: '1000px',
        height: '600px',
        data: entity,
      });
      return dialogRef.afterClosed();
    }),
  );

  @Effect()
  openDeleteDialog$ = this.actions$.pipe(
    ofType<WordPageActions.ActionWordPageOpenDeleteDialog>(
      WordPageActions.WordPageActionTypes.OpenDeleteDialog,
    ),
    exhaustMap(action => {
      const dialogRef = this.dialog.open(DeleteDialogComponent);
      return dialogRef
        .afterClosed()
        .pipe(
          map(result =>
            result
              ? new ActionWordPageDeleteOne({ id: action.payload.id })
              : new ActionWordPageOpenDeleteDialogDismissed(),
          ),
        );
    }),
  );

  @Effect()
  openDeleteDialogConfirmed$ = this.actions$.pipe(
    ofType<WordPageActions.ActionWordPageDeleteOne>(
      WordPageActions.WordPageActionTypes.DeleteOneWord,
    ),
    exhaustMap(action => {
      return this.wordService.delete(action.payload.id).pipe(
        map(e => new RemoveWordSuccess({ id: action.payload.id })),
        catchError(error => of(new RemoveWordFailure({ error }))),
      );
    }),
    tap(e => {
      if (e instanceof RemoveWordSuccess) {
        this.notificationService.success('Delete word successful.');
      }
      if (e instanceof RemoveWordFailure) {
        this.notificationService.error('Delete word fail.');
      }
    }),
  );

  @Effect({ dispatch: false })
  openCreateDialog$ = this.actions$.pipe(
    ofType<WordPageActions.ActionWordPageOpenCreateDialog>(
      WordPageActions.WordPageActionTypes.OpenCreateDialog,
    ),
    exhaustMap(() => {
      const dialogRef = this.dialog.open(CreateDialogComponent, {
        width: '1000px',
        height: '600px',
      });
      return dialogRef.afterClosed();
    }),
  );

  @Effect()
  updateResource$ = this.actions$.pipe(
    ofType<WordPageActions.ActionWordPageUpdateOne>(
      WordPageActions.WordPageActionTypes.UpdateOneWord,
    ),
    switchMap(({ payload }) =>
      this.wordService.update(payload.entity.id, payload.entity).pipe(
        map(e => new UpdateWordsSuccess(e)),
        catchError(e => of(new UpdateWordsFailure(e))),
      ),
    ),
    tap(e => {
      if (e instanceof UpdateWordsSuccess) {
        this.notificationService.success('Update word successful.');
      }
      if (e instanceof UpdateWordsFailure) {
        this.notificationService.error('Update word false.');
      }
    }),
  );

  @Effect()
  createResource$ = this.actions$.pipe(
    ofType<WordPageActions.ActionWordPageCreateOne>(
      WordPageActions.WordPageActionTypes.CreateOneWord,
    ),
    switchMap(({ payload }) =>
      this.wordService.create(payload.entity).pipe(
        map(e => new AddWordsSuccess(e)),
        catchError(e => of(new AddWordsFailure(e))),
      ),
    ),
    tap(e => {
      if (e instanceof AddWordsSuccess) {
        this.notificationService.success('Create word successful.');
      }
      if (e instanceof AddWordsFailure) {
        this.notificationService.error('Create word false.');
      }
    }),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dialog: MatDialog,
    private readonly store: Store<State>,
    private readonly wordService: WordService,
    private readonly notificationService: NotificationService,
  ) {}
}
