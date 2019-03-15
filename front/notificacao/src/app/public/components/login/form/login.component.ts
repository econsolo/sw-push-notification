import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from '../../../../common/util/util.service';
import { UsuarioService } from '../../../../common/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public hide = false;

  constructor(public router: Router,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private utilService: UtilService) {

    this.form = formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.maxLength(25)
      ]],
      senha: ['', [
        Validators.required,
        Validators.maxLength(200)
      ]]
    });

  }

  ngOnInit() {
    this.utilService.clearCookies();
  }

  public login(user: any): void {
    if (this.form.invalid) {
      this.utilService.showErrors(this.form);
      return;
    }

    this.usuarioService.logar(user).subscribe(result => {
      this.insertCookies(result.data);
      this.utilService.successDynamic('Bem vindo, ' + this.utilService.getNome() + '!');
      this.irPara('app/inicio/');
    });
  }

  private insertCookies(data: any): void {
    this.utilService.saveCookies(data);
  }

  public irPara(route: string): void {
    this.utilService.goTo(this.router, route);
  }

}
