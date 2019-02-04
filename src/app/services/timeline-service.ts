import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TimelineService{

    constructor(private api: Api) { }

    get(idpaciente:number): Observable<HttpResponse<any>>{
        let params = {'idpaciente' : idpaciente};        
        return this.api.get('api/timelines',params);        
    }
}