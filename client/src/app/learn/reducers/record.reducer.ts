import { Action } from '@ngrx/store';
import { Word } from '@app/admin/word/models/word';
import { MultipleChoice } from '@app/learn/models/quiz.model';

export interface State {
  word: Word;
  startTime: Date;
}

export const initialState: State = {
  word: null,
  startTime: null,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state;
  }
}
