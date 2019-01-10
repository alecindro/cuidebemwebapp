import { UsuarioTelefone } from "./usuariotelefone";
import { ResponsavelTelefone } from "./responsaveltelefone";

export class Telefone{
    idtelefone: number;
    telefone: string;
    ddd: string;
    tipo: string;
    operadora: string;
    usuarioTelefones: UsuarioTelefone;
    responsavelTelefones: ResponsavelTelefone;
}