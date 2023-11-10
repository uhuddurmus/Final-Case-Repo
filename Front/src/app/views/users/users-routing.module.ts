import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: UsersComponent,
        data: {
          title: 'Cart List',
        },
      },
      {
        path: ':id',
        component: UserComponent,
        data: {
          title: 'User',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
