import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app/shared';
import { AdminComponent } from './containers/admin/admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
