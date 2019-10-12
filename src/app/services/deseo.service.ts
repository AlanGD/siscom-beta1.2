import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class DeseoService {

  public url: string;

  constructor(private _http: HttpClient){
      this.url = GLOBAL.url;
  }

  insertarDeseo(usuarioId, wishList): Observable<any> {
    
    let json = JSON.stringify(wishList);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'insertarDeseo/' + usuarioId, params, {headers: headers});

  }

  consultarDeseo(usuarioId): Observable<any> {
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + 'consultarDeseo/' + usuarioId, {headers: headers});

  }

  agregarDeseo(usuarioId, wishList): Observable<any> {
    
    let json = JSON.stringify(wishList);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'agregarDeseo/' + usuarioId, params, {headers: headers});

  }

  eliminarDeseo(usuarioId): Observable<any> {
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url + 'eliminarDeseo/' + usuarioId, {headers: headers});

  }

  quitarDeseo(usuarioId, wishList): Observable<any> {
    
    let json = JSON.stringify(wishList);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'quitarDeseo/' + usuarioId, params, {headers: headers});

  }

}
