import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController, NavParams } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { MorePage } from '../more/more';
import { addPage } from '../add/add';
import { HomePopover } from '../homePopover/homePopover';
import { UserPage } from '../infoUser/infoUser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public codes: any = [];
  options: BarcodeScannerOptions;
  public morePage: any = MorePage;
  public aPage: any = addPage;
  public uPage: any = UserPage;
  constructor(public alertCtrl: AlertController,private barcode: BarcodeScanner,public navCtrl: NavController, public popoverCtrl: PopoverController, public navParams: NavParams) {
  }

  presentPopover(event){
    let popover = this.popoverCtrl.create(HomePopover);
    popover.present({
      ev: event
    })
  }

  async scanBarcode(){
    const results = await this.barcode.scan();
  	this.codes.push(results);
  }
}
