import { Component, OnInit } from '@angular/core';
import { UsuarioPhoto } from '../models/usuariophoto';
import { UsuarioPhotoService } from '../services/usuariophoto-service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-cuidador',
  templateUrl: './cuidador.page.html',
  styleUrls: ['./cuidador.page.scss'],
})
export class CuidadorPage implements OnInit {

  usuarioPhotos : Array<UsuarioPhoto>;
  filteredList : Array<UsuarioPhoto>;
  enableSearch: boolean = false;
  searchText = '';

  constructor(private route: Router, private usuarioPhotoService:UsuarioPhotoService) { }

  ngOnInit() {
    this.filteredList = new Array<UsuarioPhoto>();
    this.usuarioPhotoService.getEnabled().subscribe(res =>{
      this.usuarioPhotos = res.body;
      this.filteredList = this.usuarioPhotos;
    })
  }

  editUsuario(usuarioPhoto:UsuarioPhoto){
    this.usuarioPhotoService.usuarioPhoto = usuarioPhoto;
    this.route.navigate(['cuidador-detail']);
  }

  newUsuario(){

    this.usuarioPhotoService.usuarioPhoto = new UsuarioPhoto();
    this.usuarioPhotoService.usuarioPhoto.usuario = new Usuario();
    this.route.navigate(['cuidador-detail']);
  }
  showSearch(){
    this.enableSearch = !this.enableSearch;
  }

  async search() {
    const text = this.searchText.toLowerCase().trim();
    if(text === ''){
      this.filteredList = this.usuarioPhotos;  
    }else{
    this.filteredList = this.usuarioPhotos.filter(up => {
      return up.usuario.nome.toLocaleLowerCase().indexOf(text) >-1 ||
      up.usuario.apelido.toLocaleLowerCase().indexOf(text) > -1;
    })};
  }

}
