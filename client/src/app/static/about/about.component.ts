import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS, AppState } from '@app/core';
import { Store, select } from '@ngrx/store';
import { AuthApiActions } from '@app/auth/actions';
import { Observable } from 'rxjs';
import { selectIsAuthenticated, getUser } from '@app/auth/reducers';
import { User } from '@app/auth/models/user';

@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  releaseButler = require('../../../assets/release-butler.png');

  isAuthenticated$: Observable<boolean> = this.store.pipe(
    select(selectIsAuthenticated),
  );

  user$: Observable<User> = this.store.pipe(select(getUser));

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit() {}

  onLoginClick() {
    this.store.dispatch(new AuthApiActions.LoginRedirect());
  }

  onSignUpClick() {
    this.store.dispatch(new AuthApiActions.SignUpRedirect());
  }
}
