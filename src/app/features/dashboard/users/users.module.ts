import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { SharedModule } from '../../../shared/shared.module';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [UsersComponent, UserDialogComponent, UserDetailComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
  exports: [UsersComponent],
})
export class UsersModule {}
