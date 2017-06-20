import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ActionSheetController  } from 'ionic-angular';

//Provider
import { LoginProvider } from '../../providers/login';
import {HomePage} from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  user : any = {email: '',pass:''};
  public bl: boolean = false;
  public users : any = [];
  public hidePass: boolean = false;
  public repositories:any;
  public sendHome: any;
  public repOne: any = [];
  public validationUser: any = {email: null, password: null};
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public loginPro: LoginProvider, public actionSheetCtrl: ActionSheetController) {
    this.repositories = [];

    this.repOne = {email:"Seleccione un usuario", img:"./assets/images/avatar-user.png"};
    if( this.user.pass.length === 4 ){
      console.log("llego");
    }
  }

  beforeSend(user:any){
    console.log(user);
  }
  setMainRepository(repository){
    this.repOne = repository;
    this.bl = true;
    this.hidePass = true;
    this.user.email = this.repOne.email;
    console.log(this.repOne);
    //this.nativeStorage.set("llave", repository);
    
  }
  
  ionViewDidLoad() {
    this.loginPro.getUsers().subscribe(data=>{
      if(data.status === 200) {
        this.users = data.results;
        console.log(data.results)
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Sin Usuarios',
          subTitle: 'No se encontró ningún usuario!',
          buttons: ['OK']
        });
        alert.present();
      }
      
    });
  }
  saverange(newValue) {
  this.user.password = newValue;
  this.validationUser = {email: this.user.email, password: this.user.password}
  console.log(this.user.password);
  if(this.user.password.length === 4){
    this.submit(this.validationUser);
  }
} 
  submit(user:any){  
  	this.loginPro.validar(user).subscribe(data=>{
      if(data.status === 200) {
        this.loginPro.saveUser(data.results);
        this.navCtrl.setRoot(HomePage);
      }

      else{
        let alert = this.alertCtrl.create({
          title: 'Contraseña incorrecta',
          subTitle: 'Porfavor verique su contraseña',
          buttons: ['OK']
        });
        alert.present();
      }
      
    });

  }
  backUsers(){
    this.bl = false;
    this.hidePass = false;
    this.repOne = {email:"Seleccione un usuario", img:"./assets/images/avatar-user.png"};
  }
}