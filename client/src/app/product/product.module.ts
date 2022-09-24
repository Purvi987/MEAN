import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { AddEditComponent } from './add-edit.component';
import { ProductComponent } from './product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    AddEditComponent,
    ProductComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class ProductModule { }
