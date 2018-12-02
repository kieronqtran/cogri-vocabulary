import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '@app/core';

import * as fromAuth from '.././reducers';
import { SignUpForm } from '../models/form';
import {
  SignUpFormUpdate,
  SignUpFormReset,
  SignUp,
} from '../actions/sign-up-page.actions';

@Component({
  selector: 'anms-sign-up',
  template: `
    <anms-sign-up-form
      (clickReset)="onClickReset()"
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    >
    </anms-sign-up-form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  pending$ = this.store.pipe(select(fromAuth.getSignUpPagePending));
  error$ = this.store.pipe(select(fromAuth.getSignUpPageError));

  constructor(
    private store: Store<fromAuth.State>,
    private notificationService: NotificationService,
  ) {}

  onSubmit(form: SignUpForm) {
    this.store.dispatch(new SignUp({ form }));
    this.notificationService.info('Sign Up successful');
  }

  onClickReset() {
    this.store.dispatch(new SignUpFormReset());
  }
}
