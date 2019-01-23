import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { ResponsavelPhoto } from "../models/responsavelphoto";
import { ResponsavelTelefone } from "../models/responsaveltelefone";
import { ResponsavelTelefoneList } from "../models/responsavelTelefoneList";

@Injectable({
    providedIn: 'root'
})
export class ResponsavelTelefoneService {

    constructor(private api: Api) { }

    get(idresponsavel: number): Observable<HttpResponse<any>> {
        return this.api.get("api/responsaveltelefones/"+idresponsavel);
    }

    save(responsavelTelefone: ResponsavelTelefone): Observable<HttpResponse<any>> {
        return this.api.post("api/responsaveltelefones", responsavelTelefone);
    }

    saveDTO(responsavelTelefoneList: ResponsavelTelefoneList): Observable<HttpResponse<any>>{
        return this.api.post("api/responsaveltelefonesdto", responsavelTelefoneList);
    }
    update(responsavelTelefone: ResponsavelTelefone): Observable<HttpResponse<any>> {
        return this.api.put("api/responsaveltelefones", responsavelTelefone);
    }
    delete(idresponsaveltelefone: number): Observable<HttpResponse<any>> {
        return this.api.delete("api/responsaveltelefones/"+idresponsaveltelefone);
    }
}