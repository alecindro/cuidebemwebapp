import { Component, OnInit } from '@angular/core';
import { PacientedtoService } from '../services/pacientedto-service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PacienteDTO } from '../models/pacienteDTO';
import { ResponsavelPaciente } from '../models/responsavelpaciente';
import { Paciente } from '../models/paciente';
import { ResponsavelService } from '../services/responsavel-service';
import { Responsavel } from '../models/responsavel';
import { ResponsavelPacienteService } from '../services/responsavelpaciente-service';

@Component({
  selector: 'app-responsaveis',
  templateUrl: './responsaveis.page.html',
  styleUrls: ['./responsaveis.page.scss'],
})
export class ResponsaveisPage implements OnInit {
  pacienteDTOS: Array<PacienteDTO> = [];
  responsaveis: Array<Responsavel> = [];
  paciente: Paciente;
  selectedPaciente: boolean = false;

  constructor(private loadingController: LoadingController,
    private pacientedtoService: PacientedtoService,
    private responsavelService: ResponsavelService,
    private responsavelPacienteService: ResponsavelPacienteService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getPacientes();
    if (this.paciente) {
      this.loadResponsavel();
    }
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
        loading.dismiss();
        this.presentToast(err.error);
      });
  }
  changePaciente() {
    this.selectedPaciente = true;
    this.loadResponsavel();
  }

  private async  loadResponsavel() {
    const loading = await this.loadingController.create({
      message: 'Carregando Responsáveis...'
    });
    await loading.present();
    this.responsavelService.getByPaciente(this.paciente.idpaciente)
      .subscribe(res => {
        this.responsaveis = res.body;
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.presentToast(err.error);
      });
  }

  async editResponsavel(responsavel: Responsavel) {
    const loading = await this.loadingController.create({
      message: 'Carregando Responsável...'
    });
    await loading.present();
    this.responsavelPacienteService.getByPacienteAndResponsavel(this.paciente.idpaciente, responsavel.idresponsavel).
      subscribe(res => {
        let responsavelPaciente = res.body;
        responsavelPaciente.responsavel = responsavel;
        responsavelPaciente.paciente = this.paciente;
        this.responsavelService.responsavelPaciente = responsavelPaciente;
        loading.dismiss();
        this.router.navigate(['responsavel']);
      }, 
      err => {
        loading.dismiss();
        this.presentToast(err.error);
      });
      
  }

  newResponsavel() {
    let responsavel = new Responsavel();
    let responsavelPaciente = new ResponsavelPaciente();
    responsavelPaciente.responsavel = responsavel;
    responsavelPaciente.paciente = this.paciente;
    this.responsavelService.responsavelPaciente = responsavelPaciente;
    this.router.navigate(['responsavel']);
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }
 


}
