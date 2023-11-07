import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { AddproductComponent } from './addproduct/addproduct.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: $localize`Dashboard`,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
      },
      {
        path: 'addproduct',
        component: AddproductComponent,
        data: {
          title: 'Add Product',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
