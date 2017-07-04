import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, PopoverController } from 'ionic-angular';

import { ModalPage } from '../modalSuccess/modal';
import { MorePage } from '../more/more';
import { HomePopover } from '../homePopover/homePopover';

@Component({
  selector: 'page-transactiongood',
  templateUrl: 'transaction.html'
})
export class TransactionGoodPage {
  public productor: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    console.log("Load...")
    this.productor = navParams.get('productor');
    console.log('Productor');
    console.log(this.productor);
  }
  imprimir(){
    let pModal = this.modalCtrl.create(ModalPage);
    pModal.present();
  }
  editUser(productor){
    this.navCtrl.push(MorePage, {productor});
  }
  presentPopover(event){
		let popover = this.popoverCtrl.create(HomePopover);
		popover.present({
			ev: event
		})
	}
}
