import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { UsuarioTelefone } from "../models/usuariotelefone";
import { UsuarioTelefoneList } from "../models/usuarioTelefoneList";

@Injectable({
    providedIn: 'root'
})
export class UsuarioTelefoneService {
    constructor(private api: Api) { }
    
    
    get(login: string): Observable<HttpResponse<any>> {
        let params = {
            'login':login
        };
        return this.api.get("api/usuariotelefones/",params);
    }

    delete(idusuariotelefone: number): Observable<HttpResponse<any>> {
        return this.api.delete("api/usuariotelefones/"+idusuariotelefone);
    }


    save(usuarioTelefone: UsuarioTelefone): Observable<HttpResponse<any>> {
        return this.api.post("api/usuariotelefones/",usuarioTelefone);
    }

    saveDTO(usuarioTelefoneList: UsuarioTelefoneList): Observable<HttpResponse<any>>{
        return this.api.post("api/usuariotelefonesdto", usuarioTelefoneList);
    }
}