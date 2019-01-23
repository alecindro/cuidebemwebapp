import { Usuario } from "./usuario";

export class UserDTO{
    login: string;
    email: string;
    firstName: string;
    activated: boolean;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    authorities: Array<string> ;

}