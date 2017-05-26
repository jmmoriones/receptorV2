import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { ModalPage } from '../modalSuccess/modal';
import { MorePage } from '../more/more';

@Component({
  selector: 'page-transactiongood',
  templateUrl: 'transaction.html'
})
export class TransactionGoodPage {
  public productor: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
    console.log("Load...")
    this.productor = navParams.get('productors');
  }
  imprimir(){
    let pModal = this.modalCtrl.create(ModalPage);
    pModal.present();
  }
  editUser(productor){
    this.navCtrl.push(MorePage, {productor});
  }
}
