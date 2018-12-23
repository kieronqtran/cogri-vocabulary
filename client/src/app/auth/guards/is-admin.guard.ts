import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import * as fromAuth from '.././reducers';
import { Store, select } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { LoginRedirect } from '../actions/auth-api.actions';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(fromAuth.selectIsAdmin),
      switchMap(e => {
        if (!e) {
          this.store.dispatch(new LoginRedirect());
        }
        return of(e);
      }),
    );
  }
}
