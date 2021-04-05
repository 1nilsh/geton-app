import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImprintPage } from './imprint.page';
import { TitlebarModule } from '../common/titlebar/titlebar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TitlebarModule,
  ],
  declarations: [ImprintPage]
})
export class ImprintPageModule {}
