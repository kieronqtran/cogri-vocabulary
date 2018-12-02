import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { SignUpForm } from '../models/form';

@Component({
  selector: 'anms-sign-up-form',
  template: `
    <div class="container">
      <div class="row">
        <div class="col"><h1 class="main-heading">Sign Up</h1></div>
      </div>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <mat-card>
              <span class="d-flex justify-content-between align-items-baseline">
                <h2>{{ 'anms.auth.form.subtitle1' | translate }}</h2>
              </span>
              <div class="row">
                <mat-form-field class="col" [ngClass]="routeAnimationsElements">
                  <input
                    matInput
                    placeholder="{{ 'anms.auth.form.placeholder3' | translate }}"
                    formControlName="email"
                    type="email"
                    autocomplete="email"
                  />
                  <mat-error *ngIf="form.get('email').hasError('required')">
                    {{ 'anms.auth.form.placeholder3' | translate }}
                    {{ 'anms.auth.form.error1' | translate }}
                  </mat-error>
                  <mat-error *ngIf="form.get('email').hasError('email')">
                    {{ 'anms.auth.form.placeholder3' | translate }}
                    {{ 'anms.auth.form.error2' | translate }}
                  </mat-error>
                </mat-form-field>
                <mat-form-field class="col" [ngClass]="routeAnimationsElements">
                  <input
                    matInput
                    type="text"
                    placeholder="{{ 'anms.auth.form.placeholder1' | translate }}"
                    formControlName="name"
                  />
                  <mat-error *ngIf="form.get('name').invalid">
                    {{ 'anms.auth.form.placeholder1' | translate }}
                    {{ 'anms.auth.form.error1' | translate }}
                  </mat-error>
                </mat-form-field>
              </div>
              <div class="row">
                <mat-form-field class="col" [ngClass]="routeAnimationsElements">
                  <input
                    matInput
                    type="password"
                    placeholder="{{ 'anms.auth.form.placeholder2' | translate }}"
                    formControlName="password"
                    autocomplete="new-password"
                  />
                  <mat-error *ngIf="form.get('password').invalid">
                    {{ 'anms.auth.form.placeholder2' | translate }}
                    {{ 'anms.auth.form.error1' | translate }}
                  </mat-error>
                </mat-form-field>
                <mat-form-field class="col" [ngClass]="routeAnimationsElements">
                  <input
                    matInput
                    type="password"
                    placeholder="Confirm Password"
                    formControlName="confirmPassword"
                    autocomplete="new-password"
                  />
                  <mat-error *ngIf="form.get('confirmPassword').invalid">
                    {{ 'anms.auth.form.placeholder2' | translate }}
                    {{ 'anms.auth.form.error1' | translate }}
                  </mat-error>
                </mat-form-field>
                <p *ngIf="errorMessage" class="loginError">
                  {{ errorMessage }}
                </p>
              </div>
              <div class="row buttons d-flex justify-content-between pad">
                <button
                  mat-raised-button
                  color="primary"
                  [ngClass]="routeAnimationsElements"
                >
                  {{ 'anms.auth.form.send' | translate }}
                </button>
                <button
                  type="reset"
                  mat-raised-button
                  (click)="reset()"
                  [ngClass]="routeAnimationsElements"
                >
                  {{ 'anms.auth.form.reset' | translate }}
                </button>
              </div>
            </mat-card>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .main-heading {
        text-transform: uppercase;
        margin: 0 0 20px 0;
        text-align: center;
      }

      mat-card {
        margin-bottom: 20px;
      }

      mat-checkbox {
        margin: 10px 0 20px 0;
      }

      mat-slider {
        width: 100%;
      }

      .loginError {
        padding: 16px;
        width: 300px;
        color: white;
        background-color: red;
      }

      .buttons {
        margin: 20px 0px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<SignUpForm>();

  @Output() clickReset = new EventEmitter<void>();

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  form = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.compose([Validators.required])],
    },
    {
      validator: this.matchPassword,
    },
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
    this.clickReset.emit();
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

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
