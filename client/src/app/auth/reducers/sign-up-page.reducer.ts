import { FormState, SignUpForm } from '../models/form';
import {
  SignUpPageActionsUnion,
  SignUpPageActionTypes,
} from '../actions/sign-up-page.actions';

export interface FormState {
  signUp: SignUpForm;
}

export const initialState: SignUpForm = {
  name: '',
  email: '',
  password: '',
};

export function formReducer(
  state: SignUpForm = initialState,
  action: SignUpPageActionsUnion,
): SignUpForm {
  switch (action.type) {
    case SignUpPageActionTypes.SIGNUP:
      return {
        ...state,
        ...action.payload.form,
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
