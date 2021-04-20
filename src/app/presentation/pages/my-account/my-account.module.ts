import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAccountPageRoutingModule } from './my-account-routing.module';

import { MyAccountPage } from './my-account.page';
import { TitlebarModule } from '@app/presentation/universal-components/titlebar/titlebar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAccountPageRoutingModule,
    TitlebarModule
  ],
  declarations: [MyAccountPage]
})
export class MyAccountPageModule {
}
