import { Paciente } from "./paciente";
import { Responsavel } from "./responsavel";

export class Schedulemail{

    idschedulemail: number;
	diasemana: string;
	hora: string;
	enabled: boolean;
	paciente: Paciente;
	responsavel:  Responsavel;
}