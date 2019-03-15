import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteStack } from '../model/route-stack';
import { LOCALSTORAGE_TOKEN_KEY } from './constantes';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioJwt } from '../model/usuario-jwt';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

const jwtService = new JwtHelperService();
declare var swal: any;

@Injectable()
export class UtilService {

  constructor(private snackBar: MatSnackBar) {
  }

  private routeStack = [] as RouteStack[];

  static attrWithoutReference(objeto): any {
    return Object.assign({}, objeto);
  }

  static confirmarSenha(senhaControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = senhaControl.value === control.value;
      return valid ? null : { confirmarSenha: true };
    };
  }

  static confirmarEmail(emailControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = emailControl.value === control.value;
      return valid ? null : { confirmarEmail: true };
    };
  }

  static validateArray(control: AbstractControl): ValidationErrors | null {
    const valid = control.value && control.value.length > 0;
    return valid ? null : { validateArray: true };
  }

  static cnpj(control: AbstractControl): ValidationErrors | null {
    const valid = UtilService.validateCNPJ(control.value);
    return valid ? null : { cnpj: true };
  }

  static cpf(control: AbstractControl): ValidationErrors | null {
    const valid = UtilService.validateCPF(control.value);
    return valid ? null : { cpf: true };
  }

  static placa(control: AbstractControl): ValidationErrors | null {
    const match = control.value.match(/^[a-zA-Z]{3}\-\d{4}$/);
    return match ? null : { placa: true };
  }

  static validateDate(control: AbstractControl): ValidationErrors | null {
    // tslint:disable-next-line:max-line-length
    const match = control.value.match(/^(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/);
    return match ? null : { validateDate: true };
  }

  public showErrors(form: any): void {
    if (!form) {
      throw new Error('[showErrors] O FormGroup não deve estar nulo!');
    }
    Object.keys(form.controls).forEach(key => {
      const field = form.get(key);
      if (field['controls']) {
        this.showErrors(field);
      } else {
        field.markAsTouched();
      }
    });
  }

  public errorMsg(msg: string = 'Ocorreu um erro desconhecido! Favor, entre em contato com nossos administradores',
    callback: Function = () => {
    }): void {
    swal({
      title: 'Erro',
      text: msg,
      icon: 'error',
      button: 'Entendi',
    }).then(callback);
  }

  public successMsg(msg: string, callback: Function = () => {
  }): void {
    this.validateMsg(msg);
    swal({
      title: 'Sucesso!',
      text: msg,
      icon: 'success',
      button: 'Feito',
    }).then(callback);
  }

  public successDynamic(msg: string): Observable<MatSnackBarDismiss> {
    this.validateMsg(msg);
    const sb = this.snackBar.open(msg, null, {
      duration: 3000
    });
    return sb.afterDismissed();
  }

  public successMsgInternal(msg: string): void {
    this.validateMsg(msg);
    swal({
      title: 'Sucesso!',
      text: msg,
      icon: 'success',
      button: 'Feito',
    });
  }

  public informationMsg(msg: string): void {
    this.validateMsg(msg);
    swal(msg);
  }

  public confirmMsg(msg: string, title: string, callback: Function): void {
    this.validateMsg(msg);
    this.validarCallback(callback);
    swal({
      title: title,
      text: msg,
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Não',
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: 'Sim',
          value: true,
          visible: true,
          closeModal: true
        }
      }
    }).then(callback);
  }

  public alertMsg(msg: string, callback: Function): void {
    this.validateMsg(msg);
    this.validarCallback(callback);
    swal({
      title: 'Alerta!',
      text: msg,
      icon: 'warning',
      buttons: 'OK',
    }).then(callback);
  }

  private validateMsg(mensagem: string): void {
    if (!mensagem) {
      throw new Error('É obrigatório definir uma mensagem');
    }
  }

  private validarCallback(callback: Function): void {
    if (!callback) {
      throw new Error('É obrigatório definir um callback');
    }
  }

  public saveCookies(data: string): void {
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, data);
  }

  public clearCookies(): void {
    localStorage.clear();
  }

  public isLogado(): boolean {
    const item = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    return !!item;
  }

  public getToken(): string {
    if (this.isLogado()) {
      const jwt = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
      return jwt;
    }
    return null;
  }

  public getDadosLogado(): UsuarioJwt {
    if (this.isLogado()) {
      const jwt = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
      const decoded = jwtService.decodeToken(jwt) as UsuarioJwt;
      return decoded;
    }
    return null;
  }

  public getNome(): string {
    if (this.isLogado()) {
      const jwt = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
      const decoded = jwtService.decodeToken(jwt) as UsuarioJwt;
      return decoded.nome;
    }
    return null;
  }
  
  public getIdLogado(): number {
    if (this.isLogado()) {
      const jwt = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
      const decoded = jwtService.decodeToken(jwt) as UsuarioJwt;
      return decoded.id;
    }
    return null;
  }

  public goTo(router: Router, route: string, ...params: any[]): void {
    if (params && params.length) {
      router.navigate(this.separateArrays(route, params));
    } else {
      router.navigate([route]);
    }
    this.routeStack.push({
      route: route,
      caller: router.url,
      params: params ? params : []
    } as RouteStack);
  }

  private separateArrays(route: string, params): string[] {
    const array = [];

    array.push(route);

    if (typeof params === 'string') {
      array.push(params);
      return array;
    }

    for (let i = 0; i < params.length; i++) {
      array.push(params[i]);
    }

    return array;
  }

  public backToCaller(router: Router, defaultBackRoute: any[]): void {
    if (!this.isRouteStackEmpty()) {
      const unstacked = this.routeStack.pop();
      router.navigate([decodeURI(unstacked.caller)]);
    } else {
      router.navigate(defaultBackRoute);
    }
  }

  public clearRouteStack(): void {
    this.routeStack = [];
  }

  public isRouteStackEmpty(): boolean {
    return !this.routeStack || !this.routeStack.length;
  }

  public getDayOfWeek(dateString: string): string {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const arr = dateString.split('/').reverse();
    const date = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]));
    const dia = date.getDay();
    return days[dia];
  }

  public formatarCNPJ(cnpj: string): string {
    if (cnpj.length <= 14) {
      cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2/$3');
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
      cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    }
    return cnpj;
  }

  public getPrimeiraUltimaPalavra(texto: string): string {
    if (!texto) { return ''; }
    const palavras = texto.split(' ');
    if (palavras.length === 1) { return texto; }
    return  palavras[0] + ' ' + palavras.pop();
  }

  public getBase64(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (!file) {
        resolve('');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }
    });
  }

  // tslint:disable-next-line:member-ordering
  static validateCNPJ(cnpj: any): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '') {
      return false;
    }
    if (cnpj.length !== 14) {
      return false;
    }

    if (cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999') {
      return false;
    }

    // Validate DVs
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    // tslint:disable-next-line:triple-equals
    if (result != digits.charAt(0)) {
      return false;
    }
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    // tslint:disable-next-line:triple-equals
    return result == digits.charAt(1);
  }

  // tslint:disable-next-line:member-ordering
  static validateCPF(cpf: any): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
      return false;
    }
    if (cpf.length !== 11) {
      return false;
    }
    let sum;
    let rest;
    sum = 0;
    // tslint:disable-next-line:triple-equals
    if (cpf == '00000000000') {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      // tslint:disable-next-line:radix
      sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }
    rest = (sum * 10) % 11;

    // tslint:disable-next-line:triple-equals
    if ((rest == 10) || (rest == 11)) {
      rest = 0;
    }
    // tslint:disable-next-line:radix triple-equals
    if (rest != parseInt(cpf.substring(9, 10), 10)) {
      return false;
    }

    sum = 0;
    // tslint:disable-next-line:radix
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }
    rest = (sum * 10) % 11;

    // tslint:disable-next-line:triple-equals
    if ((rest == 10) || (rest == 11)) {
      rest = 0;
    }
    // tslint:disable-next-line:radix triple-equals
    return rest == parseInt(cpf.substring(10, 11));
  }

}
