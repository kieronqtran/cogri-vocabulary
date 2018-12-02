import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageCallbackComponent } from './containers/login-page-callback.component';

const routes: Routes = [
  {
    path: 'login/callback',
    component: LoginPageCallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
