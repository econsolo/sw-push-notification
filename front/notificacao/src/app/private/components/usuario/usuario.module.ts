import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { UsuarioFormComponent } from './form/usuario-form.component';
import { UsuarioListComponent } from './list/usuario-list.component';
import { AcaoUsuarioBottomsheetComponent } from './list/acao-usuario.bottomsheet/acao-usuario.bottomsheet.component';

@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioListComponent,
    AcaoUsuarioBottomsheetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UsuarioRoutingModule
  ],
  entryComponents: [
    AcaoUsuarioBottomsheetComponent
  ]
})
export class UsuarioModule { }
