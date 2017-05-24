import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePopover } from './homePopover';

@NgModule({
  declarations: [
    HomePopover,
  ],
  imports: [
    IonicPageModule.forChild(HomePopover),
  ],
  exports: [
    HomePopover
  ]
})
export class PopoverModule {}
