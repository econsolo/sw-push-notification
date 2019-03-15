import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateComponent } from './private.component';
import { AuthGuard } from '../common/util/auth.guard';

const routes: Routes = [{
  path: '', component: PrivateComponent,
  children: [
    { path: 'inicio', loadChildren: './components/inicio/inicio.module#InicioModule', canActivate: [AuthGuard] },
    { path: 'usuario', loadChildren: './components/usuario/usuario.module#UsuarioModule', canActivate: [AuthGuard] },
    { path: 'notificar', loadChildren: './components/notificar/notificar.module#NotificarModule', canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
