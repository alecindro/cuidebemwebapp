import { Paciente } from "../models/paciente";

import { Usuario } from "../models/usuario";

export class PhotoDTO{
    descricao:string;
    photo:string;
    paciente: Paciente;
    usuario: Usuario;
}