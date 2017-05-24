import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { LoginProvider } from '../../providers/login';
import { HomePopover } from '../homePopover/homePopover';
import { MorePage } from '../more/more';
import { RegisterPage } from '../register/register';
@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class addPage {
  public codes: any = []
  options: BarcodeScannerOptions;
  constructor(public alertCtrl: AlertController,private barcode: BarcodeScanner,public navCtrl: NavController, public popoverCtrl: PopoverController, public loginPro: LoginProvider) {
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
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS
        };
    const results = await this.barcode.scan(options);
    console.log(results);
    let barCode:any=results;
    if(barCode.text!= null){
       this.loginPro.validarCodeUser(barCode).subscribe(data=>{
         
        
          if(data.status=="200"){
              console.log(data.results);  
              this.navCtrl.push(MorePage,{"name":data.results.name,"cedula":data.results.cedula,"email":data.results.email});
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
}
