import { Component, OnInit, Input } from '@angular/core';
import { PacienteDTO } from '../models/pacienteDTO';
import { ModalController } from '@ionic/angular';
import { Api } from '../services/api/api';
import { PacientedtoService } from '../services/pacientedto-service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {

  @Input() pacienteDTO:PacienteDTO; 

  constructor(private modalCtrl:ModalController, private pacientedtoService: PacientedtoService) { }

  ngOnInit() {
  }

  check(){
    this.pacienteDTO.checkin = !this.pacienteDTO.checkin;
    if(this.pacienteDTO.checkin){
    this.pacientedtoService.checkin(this.pacienteDTO).subscribe((response)=>{
      this.pacienteDTO = response.body;
    });
    }else{
      this.pacientedtoService.checkout(this.pacienteDTO).subscribe((response)=>{
        this.pacienteDTO = response.body;
      });
    }
    this.modalCtrl.dismiss(this.pacienteDTO);
  }
  cancelar(){
    this.modalCtrl.dismiss();
  }

}
