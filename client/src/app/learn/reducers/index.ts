import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromLearnEntity from './learn.reducer';
import * as fromRoot from '@app/core/core.state';
import { environment } from '@env/environment';

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
  selectAll: selectRandomWordAll,
  selectTotal: selectRandomWordTotal,
} = fromLearnEntity.adapter.getSelectors(getLearnEntityState);
