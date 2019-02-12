import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { PacientePhoto } from "../models/paciente-photo";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export  class PacientePhotoService{

    constructor(private api: Api) { }

    save(pacientePhoto: PacientePhoto): Observable<HttpResponse<any>> {
        return this.api.post("api/pacientephotos/noprincipal", pacientePhoto);
    }

    update(pacientePhoto: PacientePhoto): Observable<HttpResponse<any>> {
        return this.api.put("api/pacientephotos", pacientePhoto);
    }
  
    delete(pacientePhoto: PacientePhoto): Observable<HttpResponse<any>> {
         return this.api.delete("api/pacientephotos/"+pacientePhoto.idpacientephoto);
    }

}