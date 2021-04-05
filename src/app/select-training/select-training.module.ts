import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTrainingPageRoutingModule } from './select-training-routing.module';

import { SelectTrainingPage } from './select-training.page';
import { TitlebarModule } from '../common/titlebar/titlebar.module';
import { TrainingModule } from '../common/training/training.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectTrainingPageRoutingModule,
    TitlebarModule,
    TrainingModule
  ],
  declarations: [SelectTrainingPage]
})
export class SelectTrainingPageModule {}
