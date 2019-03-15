import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/common/util/util.service';
import { UsuarioService } from 'src/app/common/service/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AcaoUsuarioBottomsheetComponent } from './acao-usuario.bottomsheet/acao-usuario.bottomsheet.component';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  public form: FormGroup;
  public dsUsuario: MatTableDataSource<any>;
  public total = 0;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private bottomSheet: MatBottomSheet,
    private utilService: UtilService,
    private usuarioService: UsuarioService) {

    this.form = this.montarFormGroup();
    this.dsUsuario = new MatTableDataSource();
  }

  ngOnInit() {
    this.getUsuarios();
  }

  public novo(): void {
    this.utilService.goTo(this.router, 'app/usuario/form');
  }

  public consultar(event: Event): void {
    event.preventDefault();
    this.getUsuarios();
  }

  public abrirOpcoes(id: number, is_ativo: boolean, push_object: string): void {
    const bottomSheet = this.bottomSheet.open(AcaoUsuarioBottomsheetComponent, {
      data: { is_ativo: is_ativo, can_notificar: !!push_object }
    });

    bottomSheet.afterDismissed().subscribe(opcao => {
      switch (opcao) {
        case 'alterar':
          this.utilService.goTo(this.router, 'app/usuario/form', id);
          break;
        case 'bloquear':
          this.toggleBloquear(id, false);
          break;
        case 'desbloquear':
          this.toggleBloquear(id, true);
          break;
        case 'notificar':
          this.utilService.goTo(this.router, `app/notificar/form/${id}`);
          break;
      }
    });
  }

  private toggleBloquear(id: number, is_ativo: boolean) {
    const msg = is_ativo ? 'desbloquear' : 'bloquear';
    this.utilService.confirmMsg('Deseja ' + msg + ' o usuário?', 'Confirmação', (resp) => {
      if (resp) {
        this.usuarioService.toggleAtivo(id, is_ativo).subscribe(() => {
          this.utilService.successDynamic('Usuário ' + (is_ativo ? 'desbloqueado!' : 'bloqueado!'));
          this.getUsuarios();
        });
      }
    });
  }

  public mudarPagina(event: Event): void {
    this.form.controls.pagina.setValue(event['pageIndex']);
    this.form.controls.tamanho_pagina.setValue(event['pageSize']);
    this.getUsuarios();
  }

  private getUsuarios(): void {
    this.usuarioService.consultar(this.form.value).subscribe(result => {
      this.dsUsuario.data = result.data.registros;
      this.total = result.data.total;
    });
  }

  public limpar(): void {
    this.form.reset();
    this.form.controls.pagina.setValue(0);
    this.form.controls.tamanho_pagina.setValue(10);
    this.getUsuarios();
  }

  private montarFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: ['', []],
      nome: ['', [
        Validators.maxLength(100)
      ]],
      login: ['', [
        Validators.maxLength(25)
      ]],
      pagina: [0, []],
      tamanho_pagina: [10, []]
    });
  }
}
