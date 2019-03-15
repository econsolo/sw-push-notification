import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/common/util/util.service';
import { UsuarioService } from 'src/app/common/service/usuario.service';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private utilService: UtilService,
    private swPush: SwPush) {

    this.form = this.montarFormGroup();
  }


  ngOnInit() {
  }

  public receberNotificacao(resposta: boolean): void {
    if (resposta) {
      this.swPush.requestSubscription({ serverPublicKey: environment.publicKey }).then(sub => {
        this.toggleAssinar(JSON.stringify(sub), resposta).subscribe(() => {
          this.utilService.successDynamic('Você receberá as notificações!');
        });
      }).catch(err => {
        this.utilService.errorMsg('Não foi possível assinar as notificações :(');
        console.error(err);
        this.toggleAssinar(undefined, false);
      });
    } else {
      this.toggleAssinar(undefined, resposta).subscribe(() => {
        this.utilService.successDynamic('Você não receberá as notificações!');
      });
    }
  }

  private toggleAssinar(push_object: any, resposta: boolean): Observable<any> {
    return this.usuarioService.toggleAssinarNotificacao(push_object, resposta);
  }

  private montarFormGroup(): FormGroup {
    return this.formBuilder.group({
      receber_notificacao: [false, [
        Validators.required
      ]]
    });
  }
}
