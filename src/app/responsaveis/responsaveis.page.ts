import { Component, OnInit } from '@angular/core';
import { PacientedtoService } from '../services/pacientedto-service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PacienteDTO } from '../models/pacienteDTO';
import { ResponsavelPacienteService } from '../services/responsavelpaciente-service';
import { ResponsavelPaciente } from '../models/responsavelpaciente';

@Component({
  selector: 'app-responsaveis',
  templateUrl: './responsaveis.page.html',
  styleUrls: ['./responsaveis.page.scss'],
})
export class ResponsaveisPage implements OnInit {
  pacienteDTOS: Array<PacienteDTO> = [];
  responsavelPacientes: Array<ResponsavelPaciente> = [];
  idpaciente: number;
  selectedPaciente: boolean = false;

  constructor(private loadingController: LoadingController,
    private pacientedtoService: PacientedtoService,
    private responsavelPacienteService: ResponsavelPacienteService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getPacientes();
  }
  async getPacientes() {
    const loading = await this.loadingController.create({
      message: 'Carregando ...'
    });
    await loading.present();
    await this.pacientedtoService.getPacientes()
      .subscribe(res => {
        this.pacienteDTOS = res.body;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  changePaciente() {
    console.log("paciente " + this.idpaciente);
    this.selectedPaciente = true;
    this.loadResponsavelPaciente();
  }

  private async  loadResponsavelPaciente() {
    const loading = await this.loadingController.create({
      message: 'Carregando Responsáveis...'
    });
    await loading.present();
    this.responsavelPacienteService.getByPaciente(this.idpaciente)
      .subscribe(res => {
        this.responsavelPacientes = res.body;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  editResponsavel(responsavelPaciente:ResponsavelPaciente){
    console.log("Resp: "+responsavelPaciente.responsavel.nome);
    this.responsavelPacienteService.responsavelPaciente = responsavelPaciente;
    this.router.navigate(['responsavel']);
  }

  newResponsavel() {
    console.log("newResponsavel");
    this.responsavelPacienteService.responsavelPaciente = new ResponsavelPaciente();;
    this.router.navigate(['responsavel']);
  }
  

}
