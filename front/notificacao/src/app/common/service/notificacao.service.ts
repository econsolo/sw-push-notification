import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  private notificacao_api_url = `${environment.url}/notificacao`;

  constructor(private http: HttpClient) { }

  public notificar(notificacao: any, id_usuario: number): Observable<any> {
    return this.http.post<any>(`${this.notificacao_api_url}/notificar/${id_usuario}`, { notificacao: JSON.stringify(notificacao) });
  }
}
