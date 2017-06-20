import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageTutorialPage } from './page-tutorial';

@NgModule({
  declarations: [
    PageTutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(PageTutorialPage),
  ],
  exports: [
    PageTutorialPage
  ]
})
export class PageTutorialPageModule {}
