import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
 
@Injectable()
export class UserService{
    public identity;
    public token;
    public url: string;
   

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }


    signup(user_to_login, gethash = null):Observable<any>{

        if(gethash != null){
            user_to_login.gethash = gethash;
        }

        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }

    register(user_to_register): Observable<any>{
        let json = JSON.stringify(user_to_register);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'register', params, {headers: headers});

    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    passwordRecovery(user_to_passwordRecovery): Observable<any>{
        let json = JSON.stringify(user_to_passwordRecovery);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'passwordRecovery', params, {headers: headers});

    }

    passwordReset(user_to_passwordReset, id_user: String): Observable<any>{

        let json = JSON.stringify(user_to_passwordReset);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type','application/json');
        console.log(user_to_passwordReset);

        return this._http.put(this.url+'passwordReset/' + id_user, params, {headers: headers});

    }
 
}