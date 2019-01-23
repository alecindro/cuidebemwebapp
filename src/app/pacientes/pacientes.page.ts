import { Component, OnInit } from '@angular/core';
import { PacienteDTO } from '../models/pacienteDTO';
import { PacientedtoService } from '../services/pacientedto-service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
  pacienteDTOS: Array<PacienteDTO> = [];
  searchText = '';
  filteredList : Array<PacienteDTO>= [];
  enableSearch:boolean=false;

  constructor(private loadingController: LoadingController, 
    private pacientedtoService: PacientedtoService, 
    private router: Router
    ) { }

  ngOnInit() {
      }

  ionViewWillEnter(){
    this.pacienteDTOS = [];
    this.filteredList = [];
    this.getPacientes();
  }

  async getPacientes(){
    const loading = await this.loadingController.create({
      message: 'Carregando ...'
    });
    await loading.present();
    await this.pacientedtoService.getPacienteDTOs()
    .subscribe(res => {
      this.pacienteDTOS = res.body;
      for(let pacientedto of this.pacienteDTOS){
        if(!pacientedto.photo){
          pacientedto.photo = '../../assets/imgs/rsz_1no-avatar.jpg';
        }
        this.filteredList.push(pacientedto);
      } 
      this.pacienteDTOS = this.filteredList;
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  editPaciente(pacientedto){
    this.pacientedtoService.pacienteDTO = pacientedto;
    this.router.navigate(['paciente']);
  }

  newPaciente(){
    this.pacientedtoService.pacienteDTO = new PacienteDTO();
    this.router.navigate(['paciente']);
  }

  async search() {
    const text = this.searchText.toLowerCase().trim();
    if(text === ''){
      this.filteredList = this.pacienteDTOS;  
    }else{
    this.filteredList = this.pacienteDTOS.filter(c => {
      return c.paciente.nome.toLocaleLowerCase().indexOf(text) >-1 ||
      c.paciente.apelido.toLocaleLowerCase().indexOf(text) > -1;
      //const fc = Object.assign({}, c);
      //delete fc.createdAt;            //ignore createdAt
      //return JSON.stringify(fc).toLowerCase().indexOf(text) > -1;
    })};
  }

  showSearch(){
    this.enableSearch = !this.enableSearch;
  }

}
