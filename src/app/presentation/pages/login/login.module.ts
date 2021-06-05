import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { TitlebarModule } from '../../universal-components/titlebar/titlebar.module';
import { InstallHelpComponent } from '@app/presentation/pages/login/install-help/install-help.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    TitlebarModule
  ],
  declarations: [LoginPage, InstallHelpComponent]
})
export class LoginPageModule {}
