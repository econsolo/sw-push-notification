import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UtilService } from './util.service';
import 'rxjs/add/operator/do';
import { TipoErro } from '../enum/tipo-erro';
import { Router } from '@angular/router';
import { HttpStatus } from './http.status';
import { catchError, finalize, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private router: Router,
        private httpStatus: HttpStatus,
        public utilService: UtilService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.utilService.getToken()}`
            }
        });
        this.httpStatus.setHttpStatus(true);
        return next.handle(request).pipe(
            map(event => {
                return event;
            }),
            catchError(err => {

                const msg = 'Ocorreu um erro não esperado.';
                const erro = err.error;

                switch (err.status) {
                    case 400: // bad request
                        if (erro.type === TipoErro.VALIDACAO) {
                            this.utilService.errorMsg(erro.errors);
                        } else {
                            this.utilService.errorMsg(msg);
                        }
                        break;
                    case 401: // não autorizado
                        this.utilService.errorMsg(erro.errors, () => {
                            this.utilService.goTo(this.router, 'auth/login');
                        });
                        break;
                    case 500: // erro interno do servidor
                        this.utilService.errorMsg(msg);
                        break;
                }

                return throwError(err);
            }),
            finalize(() => {
                this.httpStatus.setHttpStatus(false);
            })
        );
    }

    private tratarErro400(msg: string, erro: any): void {
        if (erro.type === TipoErro.VALIDACAO) {
            this.utilService.errorMsg(erro.errors);
        } else {
            this.utilService.errorMsg(msg);
        }
    }
}
