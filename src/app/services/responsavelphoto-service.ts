import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { ResponsavelPhoto } from "../models/responsavelphoto";

@Injectable({
    providedIn: 'root'
})
export class ResponsavelPhotoService {

    constructor(private api: Api) { }

    get(idresponsavel: number): Observable<HttpResponse<any>> {
        return this.api.get("api/responsavelphotos/"+idresponsavel);
    }

    save(responsavelPhoto: ResponsavelPhoto): Observable<HttpResponse<any>> {
        if (responsavelPhoto.idresponsavel) {
            return this.update(responsavelPhoto);
        }
        return this.api.post("api/responsavelphotos", responsavelPhoto);
    }
    update(responsavelPhoto: ResponsavelPhoto): Observable<HttpResponse<any>> {
        return this.api.put("api/responsavelphotos", responsavelPhoto);
    }
    delete(idresponsavel: number): void {
        this.api.delete("api/responsavelphotos/"+idresponsavel);
    }
}