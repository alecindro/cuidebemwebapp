import { LoadingController } from "@ionic/angular";
import { Injectable } from "@angular/core";

let _loading = null;
@Injectable({providedIn: 'root'})   
export class Loading{

    
    constructor(private readonly loadingController: LoadingController){

    }

    public async present() {
        _loading = await this.loadingController.create();
        return await _loading.present();
    }

    public dismiss() {
        if(_loading){
         _loading.dismiss();
        }
      }
 
}