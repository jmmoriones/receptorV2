import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  constructor(public navCtrl: NavController) {
    console.log("Load...")
    setTimeout( () => {
    	this.navCtrl.pop();
    }, 3000)
  }
  goBack() {
    this.navCtrl.pop();
  }
}
