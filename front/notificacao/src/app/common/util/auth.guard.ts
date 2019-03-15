import { Inject, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UtilService } from './util.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject(Router) private router: Router,
    @Inject(UtilService) private utilService: UtilService) {
  }

  canActivate() {
    const errorMessage = 'Você não está autorizado à acessar esta funcionalidade, por favor, efetue login e tente novamente';

    if (this.utilService.isLogado()) {
      return true;
    }

    this.utilService.errorMsg(errorMessage, () => {
      this.router.navigate(['auth/login']);
    });

    return true;
  }
}
