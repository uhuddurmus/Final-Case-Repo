import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Carts',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: CartComponent,
        data: {
          title: 'Cart List',
        },
      },
      {
        path: 'address',
        component: AddressComponent,
        data: {
          title: 'Address',
        },
      },
      {
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'Payment',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
