import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//import { addPage } from '../add/add';
import { HomePage } from '../home/home';

//Provider
import { LoginProvider } from '../../providers/login';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  public productor : any;
  public idTransaccion : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public prvLogin: LoginProvider) {
    this.productor = navParams.get('prod');
    console.log(this.productor);
    this.idTransaccion = this.productor._id;
    setTimeout( () => {
    	this.navCtrl.pop();
      let id = this.idTransaccion;
      console.log(`id ${id}`);
      this.prvLogin.print({value:id}).subscribe(data => {
        console.log(data);
        if(data.status === 200){
          this.navCtrl.push(HomePage);
        }else if(data.status != 200){
          console.log("No envio")
        }
      })
    }, 3000)
  }
  goBack() {
    this.navCtrl.pop();
    this.navCtrl.push(HomePage);
  }
}
