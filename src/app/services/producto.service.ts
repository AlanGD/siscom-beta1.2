import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Producto } from '../models/producto';
import { Params } from '@angular/router';

@Injectable()
export class ProductoService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    buscarProductosPaginado(termino): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type','application/json');
        let options = {headers: headers};
        
        return this._http.get(this.url+'buscarProductosPaginado/' + termino, options);
    }

    obtenerProducto(id: String): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'obtenerProducto/' + id, {headers: headers});
    }

    insertarProducto(producto: Producto): Observable<any>{

        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'insertarProducto', params, {headers: headers});

    }

    actualizarProducto(id: String, producto: Producto): Observable<any>{

        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'actualizarProducto/' + id, params, {headers: headers});

    }

    eliminarProducto(id: String){
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.delete(this.url+'eliminarProducto/' + id, {headers: headers});
    }

    eliminarImg1(id: String, producto: Producto): Observable<any>{
        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'eliminarImg1/' + id, params, {headers: headers});
    }

    eliminarImg2(id: String, producto: Producto): Observable<any>{
        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'eliminarImg2/' + id, params, {headers: headers});
    }

    eliminarImg3(id: String, producto: Producto): Observable<any>{
        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'eliminarImg3/' + id, params, {headers: headers});
    }

    eliminarImg4(id: String, producto: Producto): Observable<any>{
        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'eliminarImg4/' + id, params, {headers: headers});
    }

    buscarProductoDescuentoPromocion(termino): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type','application/json');
        let options = {headers: headers};
        
        return this._http.get(this.url+'buscarProductoDescuentoPromocion/' + termino, options);
    }

    insertarPromocionDescuento(id, insertarParams): Observable<any>{
        
        let json = JSON.stringify(insertarParams);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'insertarPromocionDescuento/' + id, params, {headers: headers});

    }

    obtenerProductosPromocion(id: String): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type','application/json');
  
        return this._http.get(this.url+'obtenerProductosPromocion/' + id, {headers: headers});
  
    }

    editarPromocionDescuento(id, actualizarParams): Observable<any> {

        let json = JSON.stringify(actualizarParams);
        let params = json;

        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url + 'editarPromocionDescuento/' + id, params, {headers: headers});

    }

    eliminarPromocionDescuento(id, eliminarParams): Observable<any> {
        
        let json = JSON.stringify(eliminarParams);
        let params = json;

        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url + 'eliminarPromocionDescuento/' + id, params, {headers: headers});

    }

    actualizarPrecioFinalEstatusInactivoPromocion(id: String): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type','application/json');
  
        return this._http.put(this.url+'actualizarPrecioFinalEstatusInactivoPromocion/' + id, {headers: headers});
  
    }

    actualizarPrecioFinalEstatusActivoPromocion(id: String): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type','application/json');
  
        return this._http.put(this.url+'actualizarPrecioFinalEstatusActivoPromocion/' + id, {headers: headers});
  
    }

    obtenerProductosCategoria(id: String, cedis): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type','application/json');
  
        return this._http.get(this.url+'obtenerProductosCategoria/' + id + '/' + cedis, {headers: headers});
  
    }

    obtenerProductoCedis(id: String, cedis): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type','application/json');
  
        return this._http.get(this.url+'obtenerProductoCedis/' + id + '/' + cedis, {headers: headers});
  
    }
 
}