import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule, GridModule } from '@coreui/angular';

import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';

@NgModule({
  imports: [
    ProductRoutingModule,
    CardModule,
    GridModule,
    CommonModule,
    DocsComponentsModule,
  ],
  declarations: [ProductComponent],
})
export class ProductModule {}
