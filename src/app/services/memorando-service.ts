import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { Memorando } from "../models/memorando";

@Injectable({
    providedIn: 'root'
})
export class MemorandoService{

    memorando: Memorando;

    constructor(private api: Api) { }

    get(idpaciente:number): Observable<HttpResponse<any>>{
        let params = {'idpaciente' : idpaciente};        
        return this.api.get('api/memorandos',params);        
    }

    save(memorando: Memorando): Observable<HttpResponse<any>>{
        return this.api.post('api/memorandos',memorando);
    }

    update(memorando: Memorando): Observable<HttpResponse<any>>{
        return this.api.put('api/memorandos',memorando);
    }

    delete(idmemorando:number): Observable<HttpResponse<any>>{
        return this.api.delete('api/memorandos/'+idmemorando);
    }
}