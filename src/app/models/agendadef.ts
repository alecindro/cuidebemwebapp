import { Paciente } from "./paciente";

export class AgendaDef{
    idagendadef: number;
    datainicio: string;
	datafim: string;
	dataRegistro: string;
	horario: String;
	repetirHoras: number;
	diasemana: string;
	grupoevento: string;
	subgrupoevento: string;
	observacao: string;
	diaspersonalizado: boolean;
	enabled: boolean;
	paciente: Paciente;
}