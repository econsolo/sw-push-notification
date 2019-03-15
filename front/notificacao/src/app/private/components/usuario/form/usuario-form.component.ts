import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/common/util/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/common/model/usuario';
import { UsuarioService } from 'src/app/common/service/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  public acao: string;
  public form: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private utilService: UtilService) {

    this.form = this.montarFormGroup();

  }

  ngOnInit() {
    this.acao = 'Cadastrar';

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.acao = 'Alterar';
      this.getUsuario(+id);
    }
  }

  public salvar(usuario: Usuario, event: Event): void {
    event.preventDefault();

    if (this.form.invalid) {
      this.utilService.showErrors(this.form);
      return;
    }

    if (!usuario.id) {
      this.usuarioService.add(usuario).subscribe(() => {
        this.utilService.successDynamic('Usuário cadastrado!');
        this.voltar();
      });
    } else {
      this.usuarioService.put(usuario.id, usuario).subscribe(() => {
        this.utilService.successDynamic('Usuário alterado!');
        this.voltar();
      });
    }

  }

  public voltar(): void {
    this.utilService.backToCaller(this.router, ['app/usuario/']);
  }

  private getUsuario(id: number): void {
    this.usuarioService.get(id).subscribe(result => {
      this.form.patchValue(result.data);
      this.form.updateValueAndValidity();
    });
  }

  private montarFormGroup(): FormGroup {
    const senha = new FormControl('', [
      Validators.required,
    ]);
    return this.formBuilder.group({
      id: ['', []],
      nome: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      email: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      login: ['', [
        Validators.required,
        Validators.maxLength(25)
      ]],
      senha: senha,
      confirmar_senha: ['', [
        Validators.required,
        UtilService.confirmarSenha(senha)
      ]]
    });
  }

}
