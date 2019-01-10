import { Usuario } from "./usuario";
import { Paciente } from "./paciente";

export class Evento{
    idevento: number;
    descevento: string;
    dataevento: Date;
    dataregistro: Date;
    enabled :  boolean;
    obsevento: string;
    grupoevento: string;
    subgrupoevento: string;
    respeventos: string;
    peso: number;
    pressaoinicial: number;
    pressaofinal: number;
    value: number;
    descricao: string;
    aspecto: string;
    quantidade: string;
    usuario: Usuario;
	paciente:  Paciente;
}