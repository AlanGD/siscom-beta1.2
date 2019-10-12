import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class CarritoService {

  public url: string;

  constructor(private _http: HttpClient){
      this.url = GLOBAL.url;
  }

  insertarCarrito(usuarioId, shoppingCart): Observable<any> {
    
    let json = JSON.stringify(shoppingCart);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'insertarCarrito/' + usuarioId, params, {headers: headers});

  }

  consultarCarrito(usuarioId): Observable<any> {
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + 'consultarCarrito/' + usuarioId, {headers: headers});

  }

  agregarCarrito(usuarioId, shoppingCart): Observable<any> {
    
    let json = JSON.stringify(shoppingCart);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'agregarCarrito/' + usuarioId, params, {headers: headers});

  }

  eliminarCarrito(usuarioId): Observable<any> {
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url + 'eliminarCarrito/' + usuarioId, {headers: headers});

  }

  quitarCarrito(usuarioId, shoppingCart): Observable<any> {
    
    let json = JSON.stringify(shoppingCart);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'quitarCarrito/' + usuarioId, params, {headers: headers});

  }

}
