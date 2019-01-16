import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Selector,
} from '@ngrx/store';
import * as fromLearnEntity from './learn.reducer';
import * as fromRoot from '@app/core/core.state';
import { selectRouterState } from '@app/core/core.state';
import { selectUser } from '@app/auth/reducers';
import { Learn } from '@app/learn/models/learn.model';
import { Word } from '@app/admin/word/models/word';

export interface LearnState {
  wordEntity: fromLearnEntity.State;
}

export interface State extends fromRoot.AppState {
  learn: LearnState;
}

export const reducers: ActionReducerMap<LearnState> = {
  wordEntity: fromLearnEntity.reducer,
};

export const getLearnState = createFeatureSelector<State, LearnState>('learn');

export const getLearnEntityState = createSelector(
  getLearnState,
  state => state.wordEntity,
);

export const {
  selectIds: selectRandomWordIds,
  selectEntities: selectRandomWordEntities,
  selectAll: selectAllLearningWords,
  selectTotal: selectRandomWordTotal,
} = fromLearnEntity.adapter.getSelectors(getLearnEntityState);

export const selectRouteAndUserId = createSelector(
  selectRouterState,
  selectUser,
  (router, user) => ({
    mode:
      router && router.state.queryParams['mode']
        ? router.state.queryParams['mode']
        : 'sequence',
    userId: user.email,
  }),
);
