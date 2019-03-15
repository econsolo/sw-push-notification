import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificarComponent } from './form/notificar.component';
import { AuthGuard } from 'src/app/common/util/auth.guard';

const routes: Routes = [
  { path: 'form/:id_usuario', component: NotificarComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificarRoutingModule { }
