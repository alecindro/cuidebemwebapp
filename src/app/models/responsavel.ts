import { ResponsavelPhoto } from "./responsavelphoto";
import { ResponsavelTelefone } from "./responsaveltelefone";
import { Schedulemail } from "./schedulemail";
import { ResponsavelPaciente } from "./responsavelpaciente";

export class Responsavel{
 
    idresponsavel: number;
	nome: string;
	apelido: string;
	email: string;
	enabled: boolean;
	datanascimento: Date;
	vinculo: string;
	tpresponsavel: boolean;
	cpf: string;
	rg: string;
	endereco: string;
	cidade: string;
	estado: string;
	genero: boolean;
	cep: string;
	responsavelPacientes: Array<ResponsavelPaciente> = [];
	responsavelPhoto:  ResponsavelPhoto = new ResponsavelPhoto();
	responsavelTelefones: Array<ResponsavelTelefone> = [];
	 schedulemails: Array<Schedulemail> ;

}