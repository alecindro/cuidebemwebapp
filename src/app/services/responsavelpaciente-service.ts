import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { ResponsavelPaciente } from "../models/responsavelpaciente";

@Injectable({
    providedIn: 'root'
})
export class ResponsavelPacienteService {

    responsavelPaciente: ResponsavelPaciente;

    constructor(private api: Api) { }

    getByPaciente(idpaciente: number): Observable<HttpResponse<any>> {
        return this.api.get("api/responsavelpacientes/"+idpaciente);
    }

    save(responsavelPaciente: ResponsavelPaciente): Observable<HttpResponse<any>> {
        if (responsavelPaciente.idresponsavelPaciente) {
            return this.update(responsavelPaciente);
        }
        return this.api.post("api/responsavelpacientes", responsavelPaciente);
    }
    update(responsavelPaciente: ResponsavelPaciente): Observable<HttpResponse<any>> {
        return this.api.put("api/responsavelpacientes", responsavelPaciente);
    }
    delete(responsavelPaciente: ResponsavelPaciente): void {
        responsavelPaciente.responsavel.enabled = false;
         this.update(responsavelPaciente);
    }
}