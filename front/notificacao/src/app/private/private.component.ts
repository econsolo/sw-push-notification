import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../common/util/util.service';
import { UsuarioJwt } from '../common/model/usuario-jwt';


@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  public menus: any[] = [];
  public usuarioLogado: UsuarioJwt;

  constructor(private router: Router,
    private utilService: UtilService) { }

  ngOnInit() {
    this.usuarioLogado = this.utilService.getDadosLogado();
    this.usuarioLogado.nome = this.utilService.getPrimeiraUltimaPalavra(this.usuarioLogado.nome);
    this.getMenus();
  }

  public irPara(path): void {
    this.utilService.goTo(this.router, `${path}`);
  }

  public sair(): void {
    this.utilService.confirmMsg('Deseja sair do sistema?', 'Tem certeza?', res => {
      if (res) {
        this.utilService.clearRouteStack();
        this.utilService.goTo(this.router, '');
      }
    });
  }

  private getMenus() {
    this.menus = [
      {
        icon: 'home',
        path: 'app/inicio/',
        label: 'Início'
      },
      {
        icon: 'people',
        path: 'app/usuario/',
        label: 'Usuários'
      }
    ];
  }
}
