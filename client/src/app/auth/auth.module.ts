import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { LoginPageComponent } from './containers/login-page.component';
// import { LoginFormComponent } from './components/login-form.component';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog.component';

import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';
import { SharedModule } from '@app/shared';
import { AuthRoutingModule } from './auth-routing.module';
// import { SignUpComponent } from './containers/sign-up.component';
// import { SignUpFormComponent } from './components/sign-up-form.component';
import { LoginPageCallbackComponent } from './containers/login-page-callback.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LogoutConfirmationDialogComponent, LoginPageCallbackComponent],
  entryComponents: [LogoutConfirmationDialogComponent],
})
export class AuthModule {}
