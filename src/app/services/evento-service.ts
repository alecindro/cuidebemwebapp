import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Evento } from "../models/evento";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EventoService{

    constructor(private api: Api){

    }

    save(evento:Evento): Observable<HttpResponse<any>>{
        return this.api.post("api/eventos",evento);
    }

    update(evento:Evento): Observable<HttpResponse<any>>{
        return this.api.put("api/eventos",evento);
    }

    delete(evento:Evento): Observable<HttpResponse<any>>{
        evento.enabled = false;
        return this.api.put("api/eventos",evento);
    }
}