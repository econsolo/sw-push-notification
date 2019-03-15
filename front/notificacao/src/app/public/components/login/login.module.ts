import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './form/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
