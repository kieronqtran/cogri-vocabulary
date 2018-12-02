import { SignUpForm } from '../models/form';
import {
  SignUpPageActionsUnion,
  SignUpPageActionTypes,
} from '../actions/sign-up-page.actions';

export interface State {
  signUp: SignUpForm;
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  signUp: {
    name: '',
    email: '',
    password: '',
  },
  error: null,
  pending: false,
};

export function reducer(
  state: State = initialState,
  action: SignUpPageActionsUnion,
): State {
  switch (action.type) {
    case SignUpPageActionTypes.SIGNUP:
      return {
        ...state,
        ...action.payload.form,
      };
    case SignUpPageActionTypes.FAIL:
      return {
        ...state,
        ...action.payload.error,
      };
    case SignUpPageActionTypes.UPDATE:
      return {
        ...state,
        ...action.payload.form,
      };
    case SignUpPageActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
