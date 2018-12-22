import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnPageComponent } from './containers/learn-page/learn-page.component';

const routes: Routes = [
  {
    path: '',
    component: LearnPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {}
