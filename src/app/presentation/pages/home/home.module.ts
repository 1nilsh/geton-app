import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TitlebarModule } from '../../universal-components/titlebar/titlebar.module';
import { TrainingModule } from '../../universal-components/training/training.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TitlebarModule,
    TrainingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
