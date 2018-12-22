import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LearnActionTypes, LoadLearns } from '../actions/learn.actions';
import { LearnService } from '../services/learn.service';
import {
  LearnApiActionTypes,
  LearnApiActions,
  LoadLearnApis,
  LoadLearnApiFail,
} from '../actions/learn-api.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LearnEffects {
  @Effect()
  loadRandomWords$ = this.actions$.pipe(
    ofType<LoadLearnApis>(LearnApiActionTypes.LoadLearnApis),
    exhaustMap(_ =>
      this.learnService.getRandom().pipe(
        map(e => new LoadLearns({ learns: e })),
        catchError(error => of(new LoadLearnApiFail({ error }))),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly learnService: LearnService,
  ) {}
}
