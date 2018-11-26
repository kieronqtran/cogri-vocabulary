import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromAuth from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

			return this.store.pipe(
				select(fromAuth.selectIsAuthenticated),
				map(authed => {
					if (authed) {
						this.router.navigate(['/'])
						return false;
					}
					return true;
				}),
				take(1)
			);
  }
}
