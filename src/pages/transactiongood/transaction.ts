import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ModalPage } from '../modalSuccess/modal';

@Component({
  selector: 'page-transactiongood',
  templateUrl: 'transaction.html'
})
export class TransactionGoodPage {
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    console.log("Load...")
  }
  imprimir(){
    let pModal = this.modalCtrl.create(ModalPage);
    pModal.present();
  }
}
