import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse, HttpParams } from '@angular/common/http';
import { Responsavel } from "../models/responsavel";
import { ResponsavelPaciente } from "../models/responsavelpaciente";


@Injectable({
    providedIn: 'root'
})
export class ResponsavelService {

    responsavel: Responsavel;
    responsavelPaciente: ResponsavelPaciente;

    constructor(private api: Api) { }

    getByPaciente(idpaciente: number): Observable<HttpResponse<any>> {
        let params = {'idpaciente' : idpaciente};        
        return this.api.get("api/responsaveis",params);
    }

    save(responsavel: Responsavel): Observable<HttpResponse<any>> {
        if (responsavel.idresponsavel) {
            return this.update(responsavel);
        }
        return this.api.post("api/responsaveis", responsavel);
    }
    update(responsavel: Responsavel): Observable<HttpResponse<any>> {
        return this.api.put("api/responsaveis", responsavel);
    }
    delete(responsavel: Responsavel): Observable<HttpResponse<any>> {
         return this.api.delete("api/responsaveis/"+responsavel.idresponsavel);
    }
}