import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LearnActionTypes, LoadLearns, RecordWord } from '../actions/learn.actions';
import { LearnService } from '../services/learn.service';
import {
  LearnApiActionTypes,
  LearnApiActions,
  LoadLearnApis,
  LoadLearnApiFail,
  RecordLearnApiSuccess,
  RecordLearnApiFail,
} from '../actions/learn-api.actions';
import { exhaustMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectRouteAndUserId,
  State,
} from '@app/learn/reducers';
import { selectUser, State as AuthState } from '@app/auth/reducers';
import { NewRecord } from '../models/learn.model';

@Injectable()
export class LearnEffects {
  @Effect()
  loadRandomWords$ = this.actions$.pipe(
    ofType<LoadLearnApis>(LearnApiActionTypes.LoadLearnApis),
    withLatestFrom(this.state.select(selectRouteAndUserId)),
    exhaustMap(([_, { mode, userId }]) =>
      this.learnService.getLearningWords(mode, userId).pipe(
        map(e => new LoadLearns({ learns: e })),
        catchError(error => of(new LoadLearnApiFail({ error }))),
      ),
    ),
  );

  @Effect()
  storeRecord$ = this.actions$.pipe(
    ofType<RecordWord>(LearnActionTypes.RecordWord),
    withLatestFrom(this.state.select(selectUser)),
    exhaustMap(([actions, userState]) => {
      const { type, payload: { record } } = actions;
      const newRecord: NewRecord = {
        userId: userState.email,
        ...record,
      };
      return this.learnService.createRecord(newRecord).pipe(
        map(() => new RecordLearnApiSuccess()),
        catchError(error => of(new RecordLearnApiFail(error))),
      )
    })
  )

  constructor(
    private readonly actions$: Actions,
    private readonly learnService: LearnService,
    private readonly state: Store<State & AuthState>,
  ) {}
}
