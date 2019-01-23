import { Injectable } from "@angular/core";
import { Api } from "./api/api";
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { PasswordChangeDTO } from "../models/passwordchangeDTO";
import { Usuario } from "../models/usuario";
import { UserDTO } from "../models/userDTO";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private api: Api) { }

    get(login: string): Observable<HttpResponse<any>> {
        return this.api.get("api/usuarios/"+login);
    }

    delete(usuario: Usuario): Observable<HttpResponse<any>>{
        usuario.enabled = false;
          return  this.update(usuario);
        
    }

    update(usuario:Usuario):Observable<HttpResponse<any>>{
        return this.api.put("api/usuarios",usuario);
    }

    create(usuario:Usuario){
        return this.api.post("api/usuarios",usuario);
    }

    changePassowrd(passwordChange: PasswordChangeDTO): Observable<HttpResponse<any>>{
        return this.api.post("sec/account/change-password",passwordChange);
    }

    getUserDTO(login: string): Observable<HttpResponse<any>> {
        return this.api.get("sec/users/"+login);
    }

    desactiveUserDTO(login: string): Observable<HttpResponse<any>> {
        return this.api.post("sec/users/desactive",login);
    }

    updateUserDTO(userDTO: UserDTO): Observable<HttpResponse<any>> {
        return this.api.put("sec/users/",userDTO);
    }

    createUserDTO(userDTO: UserDTO): Observable<HttpResponse<any>>{
        return this.api.post("sec/users",userDTO);
    }


}
