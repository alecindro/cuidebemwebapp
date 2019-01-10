import { UsuarioTelefone } from "./usuariotelefone";
import { UsuarioPhoto } from "./usuariophoto";
import { Evento } from "./evento";

export class Usuario{
    login: string;
	email: string;
	nome: string;
	apelido: string;
	enabled: boolean;
	genero: boolean;
	datanascimento: Date;
	tipousuario: string;
	usuarioPhoto: UsuarioPhoto;
	eventos:  Array<Evento> = [];
	usuarioTelefones: Array<UsuarioTelefone> = [];
}