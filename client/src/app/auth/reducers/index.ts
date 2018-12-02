import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import * as fromRoot from '@app/core/core.state';
import * as fromAuth from '../reducers/auth.reducer';
import * as fromLoginPage from '../reducers/login-page.reducer';
import * as fromSignUp from './sign-up-page.reducer';
import { AuthApiActions } from '../actions';
import { SignUpPageActionsUnion } from '../actions/sign-up-page.actions';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
  signUp: fromSignUp.State;
}

export interface State extends fromRoot.AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  signUp: fromSignUp.reducer,
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status,
);
export const getUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser,
);
export const selectIsAuthenticated = createSelector(
  getUser,
  user => !!user,
);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage,
);

export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError,
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending,
);

export const selectSignUpState = createSelector(
  selectAuthState,
  (state: AuthState) => state.signUp,
);

export const getSignUpPageError = createSelector(
  selectSignUpState,
  fromSignUp.getError,
);

export const getSignUpPagePending = createSelector(
  selectSignUpState,
  fromSignUp.getPending,
);
