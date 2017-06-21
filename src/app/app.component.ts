import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public prvLogin: LoginProvider) {
    platform.ready().then(() => {
      prvLogin.openDataBase().then(() => {
        this.prvLogin.checkUser().then((data) =>{
          console.log("Chequenado user");
          if(data){
            this.rootPage = HomePage;
          }else{
            this.rootPage = Login;
          }
        });    
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      setTimeout(() => {
        splashScreen.hide();
      }, 1000);
    });
  }
}

