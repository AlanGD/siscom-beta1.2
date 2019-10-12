import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Producto } from '../models/producto';

@Injectable()
export class UploadService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: File, name: string) {
        
        return new Promise(function(resolve, reject){
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();

            formData.append(name, files);

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4){
                    if (xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.send(formData);

        });
    
    }

}