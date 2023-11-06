import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { CartComponent } from './cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@NgModule({
  declarations: [CartComponent, AddressComponent, PaymentComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CartService],
})
export class CartModule {}
