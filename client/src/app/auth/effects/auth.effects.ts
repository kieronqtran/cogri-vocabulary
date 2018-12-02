import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap } from 'rxjs/operators';
import { LoginPageActions, AuthActions, AuthApiActions } from '../actions';
import { Credentials, User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';
import { LocalStorageService } from '@app/core';
import {
  SignUpPageActionTypes,
  SignUp,
  SignUpFailure,
  SignUpSuccess,
} from '../actions/sign-up-page.actions';
import { SignUpForm } from '../models/form';
import { LoginSuccess, AuthApiActionTypes } from '../actions/auth-api.actions';
import { environment } from '@env/environment';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginPageActions.Login>(LoginPageActions.LoginPageActionTypes.Login),
    map(action => action.payload.credentials),
    exhaustMap((auth: Credentials) =>
      this.authService.login(auth).pipe(
        map(user => new AuthApiActions.LoginSuccess({ user })),
        catchError(error => of(new AuthApiActions.LoginFailure({ error }))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.AuthApiActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/'])),
  );

  @Effect()
  loginCallback$ = this.actions$.pipe(
    ofType<LoginPageActions.LoginCallback>(
      LoginPageActions.LoginPageActionTypes.LoginCallback,
    ),
    map(action => action.payload),
    exhaustMap(payload =>
      this.authService.loginCallback(payload).pipe(
        map(user => new AuthApiActions.LoginSuccess({ user })),
        catchError(error => of(new AuthApiActions.LoginFailure({ error }))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthApiActions.AuthApiActionTypes.LoginRedirect),
    tap(authed => {
      const { domain, redirectSignIn, responseType } = environment.oauth;
      const clientId = environment.amplify.Auth.userPoolWebClientId;
      const url =
        'https://' +
        domain +
        '/login?redirect_uri=' +
        redirectSignIn +
        '&response_type=' +
        responseType +
        '&client_id=' +
        clientId;
      window.open(url, '_self');
    }),
  );

  @Effect({ dispatch: false })
  signUpRedirect$ = this.actions$.pipe(
    ofType(AuthApiActions.AuthApiActionTypes.SignUpRedirect),
    tap(authed => {
      const { domain, redirectSignIn, responseType } = environment.oauth;
      const clientId = environment.amplify.Auth.userPoolWebClientId;
      const url =
        'https://' +
        domain +
        '/signup?redirect_uri=' +
        redirectSignIn +
        '&response_type=' +
        responseType +
        '&client_id=' +
        clientId;
      window.open(url, '_self');
    }),
  );

  @Effect()
  logoutConfirmation$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LogoutConfirmation),
    exhaustMap(() => {
      const dialogRef = this.dialog.open<
        LogoutConfirmationDialogComponent,
        undefined,
        boolean
      >(LogoutConfirmationDialogComponent);

      return dialogRef.afterClosed();
    }),
    map(result =>
      result
        ? new AuthActions.Logout()
        : new AuthActions.LogoutConfirmationDismiss(),
    ),
  );

  @Effect({ dispatch: false })
  logoutConfirmed$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.Logout),
    exhaustMap(() =>
      this.authService.logout().pipe(
        tap(() => {
          this.router.navigate(['/login']);
        }),
      ),
    ),
  );

  @Effect({ dispatch: false })
  signUp$ = this.actions$.pipe(
    ofType<SignUp>(SignUpPageActionTypes.SIGNUP),
    map(action => action.payload.form),
    exhaustMap((form: SignUpForm) =>
      this.authService.signUp(form).pipe(
        map(user => [
          new SignUpSuccess(),
          new LoginSuccess({
            user: user.user
              .getSignInUserSession()
              .getIdToken()
              .decodePayload() as User,
          }),
        ]),
        catchError(error => of(new SignUpFailure({ error }))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private location: Location,
    private localStorageService: LocalStorageService,
  ) {}
}
