import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './containers/crud.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordRoutingModule {}
