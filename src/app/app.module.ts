import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Content } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera} from '@ionic-native/camera';

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
import { EditUser } from '../pages/editInfoUser/edituser';
import { SearchPage } from '../pages/searchUser/searchuser';
import { PageTutorialPage } from '../pages/page-tutorial/page-tutorial';

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
    UserPage,
    EditUser,
    SearchPage,
    PageTutorialPage
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
    UserPage,
    EditUser,
    SearchPage,
    PageTutorialPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    BarcodeScanner,
    Keyboard,
    Content
  ]
})
export class AppModule {}

