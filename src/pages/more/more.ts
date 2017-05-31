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
	public tran: any = {estopa:null,rallas:null,kilo:null, kilograms:null};
	public productor: any;
	public bl: boolean;
	constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) { 
			this.user.name=navParams.get('name');
			this.user.email=navParams.get('email');
			this.user.cedula=navParams.get('cedula');
			this.productor = navParams.get('productor');
			console.log(this.productor);
			//console.log(this.productor.kilograms);
			if(this.productor == undefined){
				console.log("Bien");
				this.bl = false;
				console.log(this.bl);
			}else{
				this.bl = true;
				console.log("Falso");
				this.tran.estopa = this.productor.estopa;
				this.tran.rallas = this.productor.raya;
				this.tran.kilo = this.productor.kilo;
				this.tran.kilograms = this.productor.kilograms;
			}
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