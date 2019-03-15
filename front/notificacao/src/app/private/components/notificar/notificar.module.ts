import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificarRoutingModule } from './notificar-routing.module';
import { NotificarComponent } from './form/notificar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';

@NgModule({
  declarations: [NotificarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NotificarRoutingModule
  ]
})
export class NotificarModule { }
