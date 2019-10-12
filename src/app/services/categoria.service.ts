import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Categoria } from '../models/categoria';

@Injectable()
export class CategoriaService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    insertarCategoria(categoria): Observable<any>{
        let json = JSON.stringify(categoria);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'insertarCategoria', params, {headers: headers});

    }

    obtenerCategorias(): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type','application/json');
        let options = {headers: headers};
        
        return this._http.get(this.url+'obtenerCategorias', options);
    }

    obtenerCategoriaId(id: String): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.get(this.url+'obtenerCategoria/' + id, {headers: headers});
    }

    actualizarCategoria(categoria): Observable<any>{
        let json = JSON.stringify(categoria);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'actualizarCategoria/' + categoria._id, params, {headers: headers});

    }

    eliminarCategoria(idCategoria): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.delete(this.url+'eliminarCategoria/' + idCategoria, {headers: headers});

    }

    insertarSubcategoria(idCategoria, subcategoria): Observable<any>{
        let json = JSON.stringify(subcategoria);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'insertarSubcategoria/' + idCategoria, params, {headers: headers});

    }

    actualizarSubcategoria(idCategoria, subcategoria): Observable<any>{
        let json = JSON.stringify(subcategoria);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'actualizarSubcategoria/' + idCategoria, params, {headers: headers});

    }

    eliminarSubcategoria(idCategoria, idSubcategoria): Observable<any>{

        let params = "json="+idSubcategoria;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
         
        return this._http.put(this.url+'eliminarSubcategoria/' + idCategoria, params, {headers: headers});


    }

    actualizarCategoriaVisible(idCategoria, categoria): Observable<any>{
        let json = JSON.stringify(categoria);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'actualizarCategoriaVisible/' + idCategoria, params, {headers: headers});

    }

    obtenerCategoriasVisibles(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type','application/json');
        let options = {headers: headers};
        
        return this._http.get(this.url+'obtenerCategoriasVisibles', options);
    }

}