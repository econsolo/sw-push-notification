import { NgModule } from '@angular/core';
import { UtilService } from './util.service';
import { AuthGuard } from './auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatSnackBarModule
  ],
  declarations: [],
  exports: [],
  providers: [
    AuthGuard,
    UtilService
  ]
})
export class UtilModule {
}
