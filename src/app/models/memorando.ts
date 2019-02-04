import { Usuario } from "./usuario";
import { Paciente } from "./paciente";

export class Memorando{
    idmemorando: number;
	dataregistro: Date;
	dataalteracao: Date;
	descricao: string;
	paciente: Paciente;
	usuario: Usuario;
}