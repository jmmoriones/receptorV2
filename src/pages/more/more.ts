import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { TransactionGoodPage } from '../transactiongood/transaction';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  public user:any={name:null,email:null,cedula:null};
  public tran: any = {estopa:null,rallas:null,kilo:null};
  public productor: any;
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) { 
  this.user.name=navParams.get('name');
  this.user.email=navParams.get('email');
  this.user.cedula=navParams.get('cedula');
  this.productor = navParams.get('productor');
  console.log(this.productor);
   }
  submit(tran:any){
    console.log(this.tran);
  }
  ionViewDidLoad() {
  }
  goodProcess(){
    this.navCtrl.push(TransactionGoodPage, {});
  }
}