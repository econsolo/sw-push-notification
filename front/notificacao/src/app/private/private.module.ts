import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { MaterialModule } from '../core/material.module';

@NgModule({
  declarations: [
    PrivateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrivateRoutingModule
  ],
  bootstrap: [PrivateComponent]
})
export class PrivateModule { }
