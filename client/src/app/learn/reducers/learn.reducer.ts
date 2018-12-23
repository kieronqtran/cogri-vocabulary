import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Learn } from '../models/learn.model';
import { LearnActions, LearnActionTypes } from '../actions/learn.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Word } from '@app/admin/word/models/word';

export interface State extends EntityState<Word> {
  loaded: boolean;
  loading: boolean;
  error: HttpErrorResponse;
}

export const adapter: EntityAdapter<Word> = createEntityAdapter<Word>({
  selectId: state => state.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  entities: {},
  loaded: false,
  loading: false,
  error: null,
});

export function reducer(state = initialState, action: LearnActions): State {
  switch (action.type) {
    case LearnActionTypes.AddLearn: {
      return adapter.addOne(action.payload.learn, state);
    }

    case LearnActionTypes.UpsertLearn: {
      return adapter.upsertOne(action.payload.learn, state);
    }

    case LearnActionTypes.AddLearns: {
      return adapter.addMany(action.payload.learns, state);
    }

    case LearnActionTypes.UpsertLearns: {
      return adapter.upsertMany(action.payload.learns, state);
    }

    case LearnActionTypes.UpdateLearn: {
      return adapter.updateOne(action.payload.learn, state);
    }

    case LearnActionTypes.UpdateLearns: {
      return adapter.updateMany(action.payload.learns, state);
    }

    case LearnActionTypes.DeleteLearn: {
      return adapter.removeOne(action.payload.id, state);
    }

    case LearnActionTypes.DeleteLearns: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case LearnActionTypes.LoadLearns: {
      return adapter.addAll(action.payload.learns, state);
    }

    case LearnActionTypes.ClearLearns: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
