import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { TransactionGoodPage } from '../transactiongood/transaction';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-more',
	templateUrl: 'more.html',
})
export class MorePage {
	public user:any={name:null,email:null,cedula:null};
  isNew:boolean=false
  owner:any;
  public transaction: any;
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public loginPro: LoginProvider) { 
  
      this.transaction = navParams.get('productor');
      console.log(this.transaction);
      if(this.transaction.kilograms==null){
        console.log(this.transaction);
        this.isNew=true;
      }else{
        this.isNew=false;
        console.log(this.transaction);
      }
      this.loginPro.currentUser().then(data => {
        this.owner=data;
        console.log(data);
      });
   }
  submit(tran:any){
    tran.user=this.transaction.user._id;
    tran.receiver=this.owner.id;
    console.log(tran);
    if(this.isNew){
      console.log("Para insertar");
      this.loginPro.createTransaction(tran).subscribe(data => {
        if(data.status === 201){
          console.log(data.results);
          tran=data.results;
          tran.user=this.transaction.user;
          let productor=tran;
          this.navCtrl.push(TransactionGoodPage, {productor});
          //console.log("Resultado productor: "+this.productor.kilo);
        }else{
          let alert = this.alertCtrl.create({
              title: "Error",
              subTitle: "Error ha ocurrido un error intente de nuevo",
              buttons: ["Close"]
          });
          alert.present();
        }
      })

    }else{
      tran._id=this.transaction._id;
      this.loginPro.updateTransaction(tran).subscribe(data => {
        console.log(data)
        if(data.status === 200){
          tran.user=this.transaction.user;
          let productor=tran;
          this.navCtrl.push(TransactionGoodPage, {productor});
          //console.log("Resultado productor: "+this.productor.kilo);
        }else{
          let alert = this.alertCtrl.create({
              title: "Error",
              subTitle: "Error ha ocurrido un error intente de nuevo",
              buttons: ["Close"]
          });
          alert.present();
        }
      })
    } 
  }
  ionViewDidLoad() {
  }
  goodProcess(){
    this.navCtrl.push(TransactionGoodPage, {});
  }
}