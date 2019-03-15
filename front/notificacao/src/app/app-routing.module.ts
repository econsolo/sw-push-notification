import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './common/util/auth.guard';

const routes: Routes = [
  { path: 'app', loadChildren: './private/private.module#PrivateModule', canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './public/public.module#PublicModule' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
