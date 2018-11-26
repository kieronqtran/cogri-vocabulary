import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from '../models/user';

@Component({
  selector: 'bc-login-form',
  template: `
	<mat-card>
		<mat-card-title>Login</mat-card-title>
		<mat-card-content>
			<div class="container">
				<form [formGroup]="form" (ngSubmit)="submit()">

					<div class="row">
						<mat-form-field class="col">
							<input
								matInput
								placeholder="Email"
								formControlName="email"
								type="email"
								autocomplete="email"
								/>
							<mat-error *ngIf="form.get('email').hasError('required')">Email is required</mat-error>
							<mat-error *ngIf="form.get('email').hasError('email')">Email should be valid</mat-error>
						</mat-form-field>
					</div>

					<div class="row">
						<mat-form-field class="col">
							<input
								matInput
								placeholder="Password"
								formControlName="password"
								type="password"
								autocomplete="current-password"
								/>
							<mat-error *ngIf="form.get('email').hasError('required')">Password is required</mat-error>
						</mat-form-field>
					</div>
					<p *ngIf="errorMessage" class="loginError">
						{{ errorMessage }}
					</p>

					<div class="row">
						<button class="loginButtons" mat-raised-button color="primary" type="submit">Login</button>
					</div>

				  <div class="row login-help">
						<p><a [routerLink]="['/register']">Register</a> - <a [routerLink]="['/forgot-password']">Forgot Password</a></p>
				  </div>
				</form>
			</div>
		</mat-card-content>
	</mat-card>
  `,
  styles: [
		`

		:host {
			display: flex;
			justify-content: center;
			margin: 72px 0;
		}

		.mat-form-field {
			width: 100%;
			min-width: 300px;
		}

		mat-card-title,
		mat-card-content {
			display: flex;
			justify-content: center;
			width: 340px;
		}

		.loginError {
			padding: 16px;
			width: 300px;
			color: white;
			background-color: red;
		}

		.loginButtons {
			margin: 10px 10px 10px 10px;
			background: #f0ad4e none repeat scroll 0 0;
			border-color: #f0ad4e;
			color: #ffffff;
			font-size: 14px;
			width: 100%;
			height: 50px;
			line-height: 50px;
			padding: 0;
		}
		.login-help {
			margin: 5px;
		}

		.login-help.a {
			color: gray;
		}
    `,
  ],
})
export class LoginFormComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<Credentials>();

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
