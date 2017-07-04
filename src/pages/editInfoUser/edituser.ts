import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';

import { UserPage } from '../infoUser/infoUser';

//provider
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginProvider } from '../../providers/login';

@Component({
	selector: 'page-edituser',
	templateUrl: 'edituser.html'
})
export class EditUser {
	public base64Image: string;
	public user: any = {_id: null,name: null, img: null, phone: null, password: null};
	public getArray: any;
	constructor(public navCtrl: NavController, public navParams: NavParams, public prvLogin: LoginProvider, public alertCtrl: AlertController, private camera: Camera, public platform: Platform) {
		this.getArray = navParams.get('user');
		console.log(this.getArray);
		this.user = {_id: this.getArray[0].id,name: this.getArray[0].name,img: this.getArray[0].images,phone: this.getArray[0].phone, password:this.getArray[0].password}
	}

	submit(data){
		this.prvLogin.editUser(data).subscribe(data => {
			if(data.status == 200){
				this.prvLogin.editUserTable(data.results);
				this.navCtrl.push(UserPage);
			}else{
				let alert = this.alertCtrl.create({
					subTitle: 'Hubo un error al actualizar la información',
					buttons: ['OK']
				});
				alert.present();
			}
		});
	}
	 camara() {

			if (!this.platform.is("cordova")) {
				console.log('Error');
			}

			const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
			saveToPhotoAlbum: true
			}

			this.camera.getPicture(options).then((imageData) => {
			this.base64Image = imageData;
			}, (err) => {
				console.log(err);
			});

		}
}