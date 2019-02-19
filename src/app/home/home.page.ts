import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController} from '@ionic/angular';
import { Loading } from '../shared/loading';
import { PacienteDTO } from '../models/pacienteDTO';
import { Router } from '@angular/router';
import { CheckinPage } from '../checkin/checkin.page';
import { PacientedtoService } from '../services/pacientedto-service';
import { OverlayEventDetail } from '@ionic/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{

  enableSearch:boolean=false;
  searchText = '';
  filteredList : Array<PacienteDTO>= [];
  pacienteDTOS : Array<PacienteDTO>= [];
  checkin: boolean = true;  

  constructor(
    private pacientedtoService: PacientedtoService,
    private router: Router,
    public modalCtrl: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController){
   
  }
  ngOnInit() {
    this.initPacientes();
   }
  

  private async initPacientes(){
    const loading = await this.loadingController.create({
      message: 'Carregando ...'
    });
    await loading.present();
    this.pacientedtoService.getPacientes().subscribe((response)=>{

      this.pacienteDTOS = response.body;
      for(let pacientedto of this.pacienteDTOS){
        if(!pacientedto.photo){
          pacientedto.photo = '../../assets/imgs/rsz_1no-avatar.jpg';
        }
        this.filteredList.push(pacientedto);
      } 
      this.pacienteDTOS = this.filteredList;
      loading.dismiss();
    },err => {
      loading.dismiss();
      this.presentToast(err.error);
      }
    )
  }


  async search() {
    const text = this.searchText.toLowerCase().trim();
    if(text === ''){
      this.filteredList = this.pacienteDTOS;  
    }else{
    this.filteredList = this.pacienteDTOS.filter(c => {
      return c.paciente.nome.toLocaleLowerCase().indexOf(text) >-1 ||
      c.paciente.apelido.toLocaleLowerCase().indexOf(text) > -1;
    })};
  }

  showSearch(){
    this.enableSearch = !this.enableSearch;
  }


  clickPaciente(pacienteDTO){
    if(pacienteDTO.checkin){
    this.detailPaciente(pacienteDTO);
    }else{
     pacienteDTO.checkin = true;
    }
  }

   onChange(pacienteDTO){
    if(this.checkin){
       this.checkin = !this.checkin;
       this.presentModal(pacienteDTO);
     }
   }

  async presentModal(pacienteDTO) {
    const modal = await this.modalCtrl.create({
      component: CheckinPage,
      componentProps: { pacienteDTO: pacienteDTO }
    });
    modal.onDidDismiss()
    .then((data: OverlayEventDetail) => {
      this.checkin = ! this.checkin;
      if(data.data){
      this.presentToast(data.data);
      }
  });
    return await modal.present();
  }


  async detailPaciente(pacienteDTO){
    this.pacientedtoService.pacienteDTO = pacienteDTO;
    this.router.navigateByUrl("/details/tabs/(eventos:eventos)",{skipLocationChange: true});
  }


  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


}
