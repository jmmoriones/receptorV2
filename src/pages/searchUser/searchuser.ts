import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, Content } from 'ionic-angular';

//Provider
import { LoginProvider } from '../../providers/login';
import { Keyboard } from '@ionic-native/keyboard';
import { MorePage } from '../more/more';
import { HomePopover } from '../homePopover/homePopover';

@Component({
  selector: 'page-search',
  templateUrl: 'searchuser.html'
})
export class SearchPage {

	@ViewChild(Content)
	content: Content;

  public users: any = [];
  public productors: any;
	public lengthUser: boolean;
	public currentUsers=[];
	public searchQuery : any;
	public num: number=0;
	public pages:number=1;
	public ocultar: string = "block";
  constructor(public navCtrl: NavController, public navParams: NavParams, private prvLogin: LoginProvider, public popoverCtrl: PopoverController, private keyboard: Keyboard)  {}
  ionViewWillEnter(){
		 this.loadUsers();
	}
  loadUsers(){
		this.num = this.num+1;
    this.prvLogin.getUsersTransaction(this.num).subscribe(data => {
      if(data.status == 200){
				for(let item of data.results){
					this.users.push(item);
				}
				this.pages=data.pages;
				
      }
    });
  }
  goUserTransaction(user){
    let productor={user:user,kilograms:null,raya:null,kilo:null,estopa:null};
    console.log(productor);
		this.navCtrl.push(MorePage, {productor});
	}
	presentPopover(event){
		let popover = this.popoverCtrl.create(HomePopover);
		popover.present({
			ev: event
		})
	}

	searchUsersFn(){
		let user = this.searchQuery;
		this.prvLogin.searchUsers({value:user}).subscribe(data =>{
			if(data.status == null){
				this.users = [];
				this.users = data.results;
			}
			if(data.status != 200){
				console.log('Hay un error');
			}
			console.log(user.length);
			if(this.searchQuery.length === 0){
					this.loadUsers();
			}
		})
	}


	doInfinite(infiniteScroll){
		console.log('Begin async operation');
		setTimeout(() => {
			console.log(this.num);
			console.log(this.pages);
			if(this.num<this.pages){
				this.loadUsers();
				console.log('Carga nuevas paginas');
			}
			infiniteScroll.complete();
		}, 500);
	}
}
