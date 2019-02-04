import { Paciente } from "./paciente";
import { Usuario } from "./usuario";

export class PacientePhoto{
    idpacientephoto: number;
    photo: string;
    descricao: string;
    principal: boolean;
    type: string;
    dataregistro: Date;
    usuario: Usuario;
    paciente: Paciente;
}