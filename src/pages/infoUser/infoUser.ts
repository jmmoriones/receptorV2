import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { EditUser } from '../editInfoUser/edituser';
import { HomePopover } from '../homePopover/homePopover';

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
	constructor(public navCtrl: NavController, public prvLogin: LoginProvider, public popoverCtrl: PopoverController) {
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
	presentPopover(event){
		let popover = this.popoverCtrl.create(HomePopover);
		popover.present({
			ev: event
		})
	}
}