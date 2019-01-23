import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { PasswordChangeDTO } from "../models/passwordchangeDTO";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AccountService {

    constructor(private api: Api) { }

    save(passwordChangeDTO: PasswordChangeDTO): Observable<HttpResponse<any>> {
        return this.api.post("sec/account/change-password", passwordChangeDTO);
    }
}