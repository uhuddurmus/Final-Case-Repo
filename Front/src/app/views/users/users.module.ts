import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule, GridModule } from '@coreui/angular';

import { UsersRoutingModule } from './Users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [UsersRoutingModule, CardModule, GridModule, CommonModule],
  declarations: [UsersComponent, UserComponent],
})
export class UsersModule {}
