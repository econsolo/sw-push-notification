import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [{
  path: '', component: PublicComponent,
  children: [
    { path: 'login', loadChildren: './components/login/login.module#LoginModule' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
