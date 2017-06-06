import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController} from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { LoginProvider } from '../../providers/login';
import { HomePopover } from '../homePopover/homePopover';
import { MorePage } from '../more/more';
import { RegisterPage } from '../register/register';
import { TransactionGoodPage } from '../transactiongood/transaction';

@Component({
	selector: 'page-add',
	templateUrl: 'add.html'
})
export class addPage {
	public codes: any = [];
	public productors: any;
	public currentProductors=[];
	options: BarcodeScannerOptions;
	constructor(public alertCtrl: AlertController,private barcode: BarcodeScanner,public navCtrl: NavController, public popoverCtrl: PopoverController, public loginPro: LoginProvider) {}
ionViewWillEnter(){
		 this.loadTransactions();
	}
	loadTransactions(){
		this.loginPro.getTransaction().subscribe(data => {
			if(data.status === 200){
				this.productors = data.results;
				for(let c of data.results){
					c.search=c.user.name+c.kilograms;
					this.currentProductors.push(c);
				}
			}else{
				console.log("Error, no ha consumido nada")
			}
		})
	}
	refresh(){
		this.productors=this.currentProductors;
	}
	presentPopover(event){
		let popover = this.popoverCtrl.create(HomePopover);
		popover.present({
			ev: event
		})
	}




	async scanBarcode(){
		let options={ 
					showFlipCameraButton : true, // iOS and Android
					showTorchButton : true, // iOS and Android
					torchOn: true, // Android, launch with the torch switched on (if available)
					prompt : "Place a barcode inside the scan area", // Android
					resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
					formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
					orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
					disableAnimations : true, // iOS
					disableSuccessBeep: false // iOS
				};
		const results = await this.barcode.scan(options);
		let barCode:any=results;
		if(barCode.text!= null){
			 this.loginPro.validarCodeUser(barCode).subscribe(data=>{
				 
				
					if(data.status=="200"){
							if(data.type=="new"){
								console.log(data.results);  
								let productor={user:data.results,kilograms:null,raya:null,kilo:null,estopa:null};
								//this.navCtrl.push(MorePage,{"name":data.results.name,"cedula":data.results.cedula,"email":data.results.email});
								this.navCtrl.push(MorePage,{productor});
							}else{
								let productor=data.results;
								this.navCtrl.push(TransactionGoodPage,{productor});
							}
							
					}else{
						if(barCode.format=="PDF_417")this.showConfirm(barCode);
						else this.noFound();
					}
			});
		}
			 
	}
	noFound(){
		let alert = this.alertCtrl.create({
				title: "Registro no encontrado",
				subTitle: "Tu codigo Qr no coincide intenta nuevamente",
				buttons: ["Close"]
		});
		alert.present();

	}
	showConfirm(barCode:any) {
		let confirm = this.alertCtrl.create({
			title: 'Registro no encontrado',
			message: 'El documento que haz intentado escanear no existe, deseas registrarlo?',
			buttons: [
				{
					text: 'Disagree',
					handler: () => {
						console.log('Disagree clicked');
						
					}
				},
				{
					text: 'Agree',
					handler: () => {
						this.navCtrl.push(RegisterPage,barCode);
					}
				}
			]
		});
		confirm.present();
	}
	goUserTransaction(productor){
		this.navCtrl.push(TransactionGoodPage, {productor});
	}
	getItems(ev: any) {
		// Reset items back to all of the items
		this.refresh();
		// set val to the value of the searchbar
		let val = ev.target.value;
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.productors = this.productors.filter((item) => {
				return (item.search.toLowerCase().indexOf(val.toLowerCase()) > -1);
				//return (item['user'].cedula);
				//console.log(cedula);
			})
		}
	}
}
