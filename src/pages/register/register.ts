import { Component } from '@angular/core';
import { NavController,AlertController, ActionSheetController,NavParams  } from 'ionic-angular';
import { MorePage } from '../more/more';
//Provider
import { LoginProvider } from '../../providers/login';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'register-page',
  templateUrl: 'register.html',
})
export class RegisterPage {
   public user : any = {email: null,cedula:null,name:null, img:null};
   public pdf417:any;
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public loginPro: LoginProvider, public actionSheetCtrl: ActionSheetController,private navParams: NavParams, private camera: Camera) {
    this.pdf417 = navParams.get('text');
    console.log(this.pdf417);
  }
  submit(user:any){
    //console.log(user);
    user.pdf417=this.pdf417;
    this.loginPro.createUser(user).subscribe(data=>{
      console.log(data);
      if(data.status === 201) {
        let productor={user:data.results,kilograms:null,raya:null,kilo:null,estopa:null};
                //this.navCtrl.push(MorePage,{"name":data.results.name,"cedula":data.results.cedula,"email":data.results.email});
        this.navCtrl.push(MorePage, {productor});  
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Datos incorrecto',
          subTitle: 'Por favor ingresa de nuevo tus datos!',
          buttons: ['OK']
        });
        alert.present();
      }
      
    });

  }

  getPhoto(){
      let options: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: 0,
        correctOrientation: true,
        quality: 100,
        saveToPhotoAlbum: true,
        targetWidth: 300,
        targetHeight: 300,
        allowEdit: false
      }
		this.camera.getPicture( options )
			.then(imageData => {
				this.user.img = `data:image/jpeg;base64,${imageData}`;
			}).catch(error =>{
				console.error( error );
			});
  }

}