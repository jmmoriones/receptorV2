import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionGoodPage } from './transaction';

@NgModule({
  declarations: [
    TransactionGoodPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionGoodPage),
  ],
  exports: [
    TransactionGoodPage
  ]
})
export class TransactionModule {}
