import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MorePage } from '../pages/more/more';
import { HomePopover } from '../pages/homePopover/homePopover';
import { addPage } from '../pages/add/add';
import { TransactionGoodPage } from '../pages/transactiongood/transaction'
import { ModalPage } from '../pages/modalSuccess/modal';
import { UserPage } from '../pages/infoUser/infoUser';

//Provider
import { LoginProvider } from '../providers/login';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    MorePage,
    HomePopover,
    addPage,
    TransactionGoodPage,
    ModalPage,
    RegisterPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    MorePage,
    HomePopover,
    addPage,
    TransactionGoodPage,
    ModalPage,
    RegisterPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    BarcodeScanner
  ]
})
export class AppModule {}

