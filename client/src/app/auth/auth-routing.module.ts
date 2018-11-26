import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './containers/login-page.component';
import { IsLoggedInGuard } from './services/is-logged-in.guard';

const routes: Routes = [
	{ path: 'login', component: LoginPageComponent, canActivate: [IsLoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
