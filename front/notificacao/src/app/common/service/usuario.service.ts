import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario_api_url = `${environment.url}/usuario`;
  private login_api_url = `${environment.url}/auth`;

  constructor(private http: HttpClient) { }

  public logar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.login_api_url}`, usuario);
  }

  public consultar(filtro: any): Observable<any> {
    return this.http.post<any>(`${this.usuario_api_url}/consultar`, filtro);
  }

  public get(id: number): Observable<any> {
    return this.http.get<any>(`${this.usuario_api_url}/${id}`);
  }

  public add(usuario: Usuario): Observable<void> {
    usuario.id = undefined;
    return this.http.post<void>(`${this.usuario_api_url}`, usuario);
  }

  public put(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.usuario_api_url}/${id}`, usuario);
  }

  public toggleAtivo(id: number, is_ativo: boolean): Observable<void> {
    return this.http.put<void>(`${this.usuario_api_url}/toggle-ativo/${id}`, { is_ativo: is_ativo });
  }

  public toggleAssinarNotificacao(sub: any, resposta: boolean): Observable<void> {
    return this.http.post<void>(`${this.usuario_api_url}/toggle-assinar`, { push_object: sub, resposta: resposta });
  }
}
