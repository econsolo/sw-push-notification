import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/common/util/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/common/service/usuario.service';
import { NotificacaoService } from 'src/app/common/service/notificacao.service';

@Component({
  selector: 'app-notificar',
  templateUrl: './notificar.component.html',
  styleUrls: ['./notificar.component.css']
})
export class NotificarComponent implements OnInit {

  public form: FormGroup;
  public usuario: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private notificacaoService: NotificacaoService,
    private utilService: UtilService) {

    this.form = this.montarFormGroup();

  }

  ngOnInit() {
    const id_usuario = this.route.snapshot.paramMap.get('id_usuario');
    this.getUsuario(+id_usuario);
  }

  public notificar(valor: any, event: Event): void {
    event.preventDefault();

    if (this.form.invalid) {
      this.utilService.showErrors(this.form);
      return;
    }

    this.notificacaoService.notificar({notification: valor}, this.usuario.id).subscribe(() => {
      this.utilService.successDynamic('Usuário notificado!');
      this.utilService.backToCaller(this.router, ['app/usuario/']);
    });

  }

  public voltar(): void {
    this.utilService.backToCaller(this.router, ['app/usuario/']);
  }

  private getUsuario(id_usuario: number): void {
    this.usuarioService.get(id_usuario).subscribe(res => {
      this.usuario = res.data;
    });
  }

  private montarFormGroup(): FormGroup {
    return this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(25)
      ]],
      body: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]]
    });
  }

}
