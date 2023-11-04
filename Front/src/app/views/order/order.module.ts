import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { OrdersRoutingModule } from './order-routing.module';
import {
  ButtonModule,
  CardModule,
  FormModule,
  TableModule,
} from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CardModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    FormModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class OrdersModule {}
