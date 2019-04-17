import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AgendaService{

    constructor(private api: Api) { }

    get(idpaciente:number, page:number): Observable<HttpResponse<any>>{
        let params = {'idpaciente' : idpaciente, 'page' : page};        
        return this.api.get('api/agendas',params);        
    }
}