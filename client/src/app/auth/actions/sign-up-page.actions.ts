import { Action } from '@ngrx/store';
import { Credentials } from '../models/user';
import { SignUpForm } from '../models/form';

export enum SignUpPageActionTypes {
  SIGNUP = '[Sign Up Page] Sign Up',
  SUCCESS = '[Sign Up Page] Sign Up Success',
  UPDATE = '[Sign Up Page] Update',
  RESET = '[Sign Up Page] Reset',
  FAIL = '[Sign Up Page] Fail',
}

export class SignUp implements Action {
  readonly type = SignUpPageActionTypes.SIGNUP;
  constructor(public payload: { form: SignUpForm }) {}
}

export class SignUpFormUpdate implements Action {
  readonly type = SignUpPageActionTypes.UPDATE;
  constructor(readonly payload: { form: SignUpForm }) {}
}

export class SignUpFormReset implements Action {
  readonly type = SignUpPageActionTypes.RESET;
}

export class SignUpSuccess implements Action {
  readonly type = SignUpPageActionTypes.SUCCESS;
}

export class SignUpFailure implements Action {
  readonly type = SignUpPageActionTypes.FAIL;

  constructor(public payload: { error: any }) {}
}

export type SignUpPageActionsUnion =
  | SignUp
  | SignUpFormUpdate
  | SignUpFormReset
  | SignUpSuccess
  | SignUpFailure;
