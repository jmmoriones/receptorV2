import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController, ModalController} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from 'ionic-native';

import { LoginProvider } from '../../providers/login';
import { HomePopover } from '../homePopover/homePopover';
import { MorePage } from '../more/more';
import { RegisterPage } from '../register/register';
import { TransactionGoodPage } from '../transactiongood/transaction';
import { PageTutorialPage } from '../page-tutorial/page-tutorial';

@Component({
	selector: 'page-add',
	templateUrl: 'add.html'
})
export class addPage {
	public codes: any = [];
	public productors: any;
	public currentProductors=[];
	public showStyle: boolean = false;
	public ocultar: string = "block";
	options: BarcodeScannerOptions;
	constructor(public alertCtrl: AlertController,private barcode: BarcodeScanner,public navCtrl: NavController, public popoverCtrl: PopoverController, public loginPro: LoginProvider, private keyboard: Keyboard, public modalCtrl: ModalController) {
		let pModal = this.modalCtrl.create(PageTutorialPage);
    	pModal.present();
		this.keyboard.onKeyboardShow().subscribe(dt =>{
			if(dt){
				this.ocultar = "none";
				console.log("Abrio");
			}
		});
		this.keyboard.onKeyboardHide().subscribe(dt =>{
			if(dt){
				this.ocultar = "block";
				console.log("cerro");
			}
		});
	}
ionViewWillEnter(){
	
		 this.loadTransactions();
	}
	loadTransactions(){
		this.loginPro.getTransaction().subscribe(data => {
			this.productors = [];
			if(data.status === 200){
				this.productors = data.results;
				console.log(this.productors);

				for(let c of data.results){
					//c.search=c.user.name+c.kilograms;
					c.search=c.user.cedula+c.dni;
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
					torchOn: false, // Android, launch with the torch switched on (if available)
					prompt : "Place a barcode inside the scan area", // Android
					resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
					formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
					orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
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
			})
		}
	}
	openCamera(){
		let cameraOption : CameraOptions = {
			quality: 80,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			saveToPhotoAlbum: false
		};
		Camera.getPicture(cameraOption).then((imageData) => {
			alert(imageData);
		}).catch(err => console.log(err));
	}
}
