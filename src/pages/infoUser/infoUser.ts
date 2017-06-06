import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditUser } from '../editInfoUser/edituser';

//provider
import { LoginProvider } from '../../providers/login';

@Component({
	selector: 'page-user',
	templateUrl: 'infoUser.html'
})
export class UserPage {
	public infoUser: any = [];
	public valTransaction: number;
	public dateEndt: any;
	constructor(public navCtrl: NavController, public prvLogin: LoginProvider) {
		this.prvLogin.getTransaction().subscribe(data => {
			this.valTransaction = data.results.length
		});
		this.prvLogin.currentUser().then((data) => {
			this.infoUser.push(data);
			console.log(this.infoUser);
		})
	}
	editInfo(user){
		console.log(user);
		this.navCtrl.push(EditUser, {user:user})
	}
}