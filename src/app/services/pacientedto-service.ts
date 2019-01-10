import { Injectable } from '@angular/core';
import { Api } from './api/api';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { PacienteDTO } from '../models/pacienteDTO';

@Injectable({
  providedIn: 'root'
})
export class PacientedtoService {
pacienteDTO : PacienteDTO;

  constructor(private api: Api) { }

getPacientes() :Observable<HttpResponse<any>>{
  return this.api.get("api/pacientes");
}

getPacienteDTOs() :Observable<HttpResponse<any>>{
  return this.api.get("api/pacientedtos");
}
checkin(pacienteDTO:PacienteDTO): Observable<HttpResponse<any>>{
  return this.api.post("api/pacientes/checkin",pacienteDTO);
}

checkout(pacienteDTO:PacienteDTO): Observable<HttpResponse<any>>{
  return this.api.post("api/pacientes/checkout",pacienteDTO);
}
save(pacienteDTO:PacienteDTO): Observable<HttpResponse<any>>{
  if(pacienteDTO.paciente.idpaciente){
    return this.update(pacienteDTO);
  }
  return this.api.post("api/pacientes",pacienteDTO);
}
update(pacienteDTO:PacienteDTO): Observable<HttpResponse<any>>{
  return this.api.put("api/pacientes",pacienteDTO);
}


}
