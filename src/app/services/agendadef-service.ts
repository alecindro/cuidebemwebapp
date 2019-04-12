import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { AgendaDef } from "../models/agendadef";

@Injectable({
    providedIn: 'root'
})
export class AgendaDefService{

    constructor(private api: Api){

    }

    save(agendaDef:AgendaDef): Observable<HttpResponse<any>>{
        return this.api.post("api/agendadefs",agendaDef);
    }

    update(agendaDef:AgendaDef): Observable<HttpResponse<any>>{
        return this.api.put("api/agendadefs",agendaDef);
    }

    delete(agendaDef:AgendaDef): Observable<HttpResponse<any>>{
        agendaDef.enabled = false;
        return this.api.delete("api/agendadefs/"+agendaDef.idagendadef);
    }

    getByPaciente(idpaciente:Number): Observable<HttpResponse<any>>{
        let params = {'idpaciente' : idpaciente};
        return this.api.get("api/agendadefs",params);
    }
    get(idagendadef:number): Observable<HttpResponse<any>>{
        return this.api.get("api/agendadefs/"+idagendadef);
    }


}