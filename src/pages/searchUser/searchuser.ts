import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Provider
import { LoginProvider } from '../../providers/login';
import { MorePage } from '../more/more';

@Component({
  selector: 'page-search',
  templateUrl: 'searchuser.html'
})
export class SearchPage {
  public users: any = [];
  public productors: any;
	public lengthUser: boolean;
	public currentProductors=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private prvLogin: LoginProvider) {}
  ionViewWillEnter(){
		 this.loadTransaction();
		 console.log("Desde en ionView");
		 console.log(this.users);
	}
  loadTransaction(){
    this.prvLogin.getUsersTransaction().subscribe(data => {
      if(data.status == 200){
        this.users = data.results;
        console.log(this.users);
        for(let c of data.results){
					c.search=c.cedula;
					this.currentProductors.push(c);
				}
      }
    });
  }
  refresh(){
		this.users=this.currentProductors;
	}
  getItems(ev: any) {
		// Reset items back to all of the items
		this.refresh();
		// set val to the value of the searchbar
		let val = ev.target.value;
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.users = this.users.filter((item) => {
				console.log(this.users);
				return (item.search.toLowerCase().indexOf(val.toLowerCase()) > -1);
				//return (item['user'].cedula);
				//console.log(cedula);
			})
			if(this.users.length > 0){
				this.lengthUser = false;
			}else{
				this.lengthUser = true;
			}
			console.log(this.lengthUser);
		}
	}
  goUserTransaction(user){
    let productor={user:user,kilograms:null,raya:null,kilo:null,estopa:null};
    console.log(productor);
		this.navCtrl.push(MorePage, {productor});
	}
}
