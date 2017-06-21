import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { addPage } from '../add/add';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  constructor(public navCtrl: NavController) {
    console.log("Load...")
    setTimeout( () => {
    	this.navCtrl.pop();
      this.navCtrl.push(addPage);
    }, 3000)
  }
  goBack() {
    this.navCtrl.pop();
    this.navCtrl.push(addPage);
  }
}
