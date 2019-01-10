import { Patologiapaciente } from "./patologiapaciente";

export class Paciente{
    idpaciente : number;
    nome : string ;
    apelido : string;
    genero : boolean ;
    enabled : boolean ;
    datanascimento : Date;
    status : boolean;
    responsavelPacienteList : Array<Object> = [];
    patologiaPaciente : Array<Patologiapaciente> = [];
    tpestadia : boolean;
}