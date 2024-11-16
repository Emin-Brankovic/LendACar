import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { VehicleCategoriesComponent } from './vehicle-category/vehicle-category.component';
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    VehicleCategoriesComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    FormsModule
  ]
})
export class VehicleModule { }