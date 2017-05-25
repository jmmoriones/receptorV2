import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Provider
import { LoginProvider } from '../../providers/login';

import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'homePopver.html',
})
export class HomePopover {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginP: LoginProvider) {  }

   
  ionViewDidLoad() {
   
  }
  closeSesion(){
    this.loginP.closeSesion();
    this.navCtrl.push(Login);
  }
}