import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { CardsRoutingModule } from './cards-routing.module';
import { ButtonModule, CardModule, FormModule, TableModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    CardModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    FormModule,
    ReactiveFormsModule
  ]
})
export class CardsModule { }
