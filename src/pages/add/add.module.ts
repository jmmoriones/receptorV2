import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { addPage } from './add';

@NgModule({
  declarations: [
    addPage,
  ],
  imports: [
    IonicPageModule.forChild(addPage),
  ],
  exports: [
    addPage
  ]
})
export class AddModule {}
