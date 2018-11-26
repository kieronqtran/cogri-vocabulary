import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  LoginPageActions,
  AuthActions,
  AuthApiActions,
} from '../actions';
import { Credentials } from '../models/user';
import { AuthService } from '../services/auth.service';
import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';
import { LocalStorageService } from '@app/core';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginPageActions.Login>(LoginPageActions.LoginPageActionTypes.Login),
    map(action => action.payload.credentials),
    exhaustMap((auth: Credentials) =>
      this.authService.login(auth).pipe(
        map(user => new AuthApiActions.LoginSuccess({ user })),
        catchError(error => of(new AuthApiActions.LoginFailure({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.AuthApiActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      AuthApiActions.AuthApiActionTypes.LoginRedirect
    ),
    tap(authed => {
      this.router.navigate(['/login']);
    })
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
    map(
      result =>
        result
          ? new AuthActions.Logout()
          : new AuthActions.LogoutConfirmationDismiss()
    )
	);

  @Effect({ dispatch: false })
	logoutConfirmed$ = this.actions$.pipe(
		ofType(AuthActions.AuthActionTypes.Logout),
    exhaustMap(() =>
      this.authService.logout().pipe(
				tap(() => {
					this.router.navigate(['/login']);
				})
      )
    )
	)

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
		private localStorageService: LocalStorageService,
	) {}

}
