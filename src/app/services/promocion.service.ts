import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Promocion } from '../models/promocion';

@Injectable()
export class PromocionService {

  public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    buscarDescuentoPromocion(termino): Observable<any> {

      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      let options = {headers: headers};
      
      return this._http.get(this.url+'buscarDescuentoPromocion/' + termino, options);

     }

     obtenerPromocion(id: String): Observable<any> {

      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.get(this.url+'obtenerPromocion/' + id, {headers: headers});

      }

     insertarDescuentoItem(promocion: Promocion): Observable<any> {

      let params = JSON.stringify(promocion);
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.post(this.url+'insertarPromocion', params, {headers: headers});

      }

      actualizarPromocion( producto: Promocion): Observable<any> {

        const params = JSON.stringify(producto);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + 'actualizarPromocion/', params, {headers});

    }

}
