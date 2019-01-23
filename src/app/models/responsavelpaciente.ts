import { Paciente } from "./paciente";
import { Responsavel } from "./responsavel";

export class ResponsavelPaciente{

    idresponsavelPaciente: number;
    paciente: Paciente = new Paciente();
    responsavel: Responsavel = new Responsavel();
}