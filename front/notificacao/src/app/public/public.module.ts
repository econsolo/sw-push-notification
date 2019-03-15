import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { MaterialModule } from '../core/material.module';

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
