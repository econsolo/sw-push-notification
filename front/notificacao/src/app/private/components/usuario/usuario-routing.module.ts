import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioFormComponent } from './form/usuario-form.component';
import { UsuarioListComponent } from './list/usuario-list.component';
import { AuthGuard } from 'src/app/common/util/auth.guard';

const routes: Routes = [
  { path: 'form', component: UsuarioFormComponent, canActivate: [AuthGuard] },
  { path: 'form/:id', component: UsuarioFormComponent, canActivate: [AuthGuard] },
  { path: '', component: UsuarioListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
