import { NgModule } from '@angular/core';
import { TitlebarComponent } from './titlebar.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TitlebarComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    TitlebarComponent
  ]
})
export class TitlebarModule {

}
