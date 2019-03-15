import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './list/inicio.component';
import { AuthGuard } from 'src/app/common/util/auth.guard';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [AuthGuard], data: { role: [] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
