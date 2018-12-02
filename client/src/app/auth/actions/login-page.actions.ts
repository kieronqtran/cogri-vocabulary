import { Action } from '@ngrx/store';
import { Credentials, User } from '../models/user';

export enum LoginPageActionTypes {
  LoginCallback = '[Login Page] Login Callback',
  Login = '[Login Page] Login',
}

export class LoginCallback implements Action {
  readonly type = LoginPageActionTypes.LoginCallback;

  constructor(public payload: { access_token: string; id_token: string }) {}
}

export class Login implements Action {
  readonly type = LoginPageActionTypes.Login;

  constructor(public payload: { credentials: Credentials }) {}
}

export type LoginPageActionsUnion = Login | LoginCallback;
