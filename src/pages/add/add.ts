import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, PopoverController, ModalController, Searchbar} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { LoginProvider } from '../../providers/login';
import { HomePopover } from '../homePopover/homePopover';
import { MorePage } from '../more/more';
import { RegisterPage } from '../register/register';
import { TransactionGoodPage } from '../transactiongood/transaction';
//import { PageTutorialPage } from '../page-tutorial/page-tutorial';

@Component({
	selector: 'page-add',
	templateUrl: 'add.html'
})
export class addPage {
	@ViewChild('searchbar') searchbar: Searchbar;
	public codes: any = [];
	public productors: any=[];
	public currentProductors=[];
	public showStyle: boolean = false;
	public ocultar: string = "block";
	public imageError : string;
	public num: number = 0;
	public pages:number=1;
	public searchQuery: any;
	options: BarcodeScannerOptions;
	constructor(public alertCtrl: AlertController,private barcode: BarcodeScanner,public navCtrl: NavController, public popoverCtrl: PopoverController, public loginPro: LoginProvider, private keyboard: Keyboard, public modalCtrl: ModalController) {
		this.keyboard.onKeyboardShow().subscribe(dt =>{
			if(dt){
				this.ocultar = "none";
			}
		});
		this.keyboard.onKeyboardHide().subscribe(dt =>{
			if(dt){
				this.ocultar = "block";
				//this.refreshSearch();
			}
		});
	}
	ionViewWillEnter(){	
		 this.loadTransactions();
	}
	ngAfterViewInit(){
		// this.scrollContent();
		// this.content.ionScrollEnd.subscribe((data) => {
		// 	let dimensions = this.content.getContentDimensions();
		// 	console.log("Dimensions");
		// 	console.log(dimensions.scrollTop);
		// 	console.log("scroll");
		// 	console.log(data);
		// });
	}
	submit(ev){
		this.searchTransactions();
	}
	loadTransactions(){
		this.num = this.num+1;
		this.loginPro.getTransaction(this.num).subscribe(data => {
			//this.productors = [];
			if(data.status === 200){
				for(let item of data.results){
					this.productors.push(item);
				}
				this.pages=data.pages;
			}
		})
	}
	searchTransactions(){
		console.log(this.searchQuery);
		let input = this.searchQuery;
		this.loginPro.searchTransaction({value:input}).subscribe(data =>{
			console.log(data);
			if(data.status === 200){
				this.productors = [];
				this.productors = data.results;
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
					text: 'Cancelar',
					handler: () => {
						console.log('Disagree clicked');
					}
				},
				{
					text: 'Agregar',
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
	doInfinite(infiniteScroll) {
		console.log('Begin async operation');
		setTimeout(() => {
			console.log(this.num);
			console.log(this.pages);
			if(this.num<this.pages){
				this.loadTransactions();
				console.log('Carga nuevas paginas');
			}
			infiniteScroll.complete();
		}, 500);
	}
}
