import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './containers/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'word',
    pathMatch: 'full',
  },
  {
    path: 'word',
    loadChildren: './word/word.module#WordModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
