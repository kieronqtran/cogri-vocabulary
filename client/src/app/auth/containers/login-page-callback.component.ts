import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginPageActions } from '.././actions';
import * as fromAuth from '.././reducers';

@Component({
  selector: 'anms-login-page-callback',
  template: `
    <p>login-page-callback works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageCallbackComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromAuth.State>,
  ) {}

  ngOnInit() {
    this._subscriptions = this.route.fragment.subscribe(url => {
      const value2 = JSON.parse(
        '{"' + url.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function(key, value) {
          return key === '' ? value : decodeURIComponent(value);
        },
      );
      this.store.dispatch(new LoginPageActions.LoginCallback(value2));
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
