import { Agenda } from "./agenda";
import { Paciente } from "./paciente";
import { PatologiaPacienteDTO } from "./patologiaPacienteDTO";

export class PacienteDTO{
    paciente: Paciente = new Paciente();
	photo: string;
	checkin: boolean;
	nextAgenda: Agenda = new Agenda();
	patologiasDTO: Array<PatologiaPacienteDTO> = [];
}