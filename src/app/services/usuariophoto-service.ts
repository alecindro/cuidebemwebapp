import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { UsuarioPhoto } from "../models/usuariophoto";

@Injectable({
    providedIn: 'root'
})
export class UsuarioPhotoService {

    usuarioPhoto: UsuarioPhoto;
    
    constructor(private api: Api) { }


    save(usuarioPhoto: UsuarioPhoto): Observable<HttpResponse<any>> {
        return this.api.post("api/usuariophotos", usuarioPhoto);
    }

    getEnabled():Observable<HttpResponse<any>>{
        return this.api.get("api/usuariophotos/enabled");
    }
    
   
}