import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController} from '@ionic/angular';
import { Loading } from '../shared/loading';
import { PacienteDTO } from '../models/pacienteDTO';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckinPage } from '../checkin/checkin.page';
import { PacientedtoService } from '../services/pacientedto-service';


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
  pacienteDTO: PacienteDTO;

  constructor(
    private pacientedtoService: PacientedtoService,
    private router: Router,
    public modalCtrl: ModalController){
   
  }
  ngOnInit() {
    
    this.pacientedtoService.getPacientes().subscribe((response)=>{

      this.pacienteDTOS = response.body;
      for(let pacientedto of this.pacienteDTOS){
        if(!pacientedto.photo){
          pacientedto.photo = '../../assets/imgs/rsz_1no-avatar.jpg';
        }
        this.filteredList.push(pacientedto);
      } 
      this.pacienteDTOS = this.filteredList;
    },error => {
      console.log(error);
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
      //const fc = Object.assign({}, c);
      //delete fc.createdAt;            //ignore createdAt
      //return JSON.stringify(fc).toLowerCase().indexOf(text) > -1;
    })};
  }

  showSearch(){
    this.enableSearch = !this.enableSearch;
  }


  clickPaciente(pacienteDTO){
    this.pacienteDTO = pacienteDTO;
    if(pacienteDTO.checkin){
    this.detailPaciente();
    }else{
      this.presentModal();
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: CheckinPage,
      componentProps: { pacienteDTO: this.pacienteDTO }
    });
    modal.onDidDismiss()
    .then((data) => {
      if(data){
      this.pacienteDTO = data['data'];
      }
  });
    return await modal.present();
  }


  async detailPaciente(){
    this.pacientedtoService.pacienteDTO = this.pacienteDTO;
    this.router.navigateByUrl("/details/tabs/(eventos:eventos)",{skipLocationChange: true});
  }


}
