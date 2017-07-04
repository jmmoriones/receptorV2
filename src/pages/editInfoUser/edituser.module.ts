import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUser } from './edituser';

@NgModule({
  declarations: [
    EditUser,
  ],
  imports: [
    IonicPageModule.forChild(EditUser),
  ],
  exports: [
    EditUser
  ]
})
export class EditModule {}
