import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '@app/core';
import { ActionFormReset, ActionFormUpdate } from '../actions/form.actions';

import { State, selectFormState } from '../reducers';
import { SignUpForm } from '../models/form';
import {
  SignUpFormUpdate,
  SignUpFormReset,
  SignUp,
} from '../actions/sign-up-page.actions';

@Component({
  selector: 'anms-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  form = this.fb.group(
    {
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, Validators.compose([Validators.required])],
    },
    {
      validator: this.matchPassword,
    },
  );

  formValueChanges$: Observable<SignUpForm>;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(selectFormState),
        take(1),
      )
      .subscribe(form => this.form.patchValue(form));
  }

  save() {
    this.store.dispatch(new SignUp({ form: this.form.value }));
  }

  submit() {
    if (this.form.valid) {
      this.save();
      this.notificationService.info('Sign Up successful');
    }
  }

  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
    this.store.dispatch(new SignUpFormReset());
  }

  matchPassword(control: AbstractControl) {
    const password = control.get('password').value;

    const confirmPassword = control.get('confirmPassword').value;

    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ ConfirmPassword: true });
    } else {
      return null;
    }
  }
}
