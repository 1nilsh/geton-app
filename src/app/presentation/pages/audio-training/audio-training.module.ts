import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioTrainingPageRoutingModule } from './audio-training-routing.module';

import { AudioTrainingPage } from './audio-training.page';
import { TitlebarModule } from '../../universal-components/titlebar/titlebar.module';
import { AudioListItemComponent } from './audio-list-item/audio-list-item.component';
import { AudioplayerComponent } from './audioplayer/audioplayer.component';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { TimeModule } from '@app/infrastructure/time/time.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudioTrainingPageRoutingModule,
    TitlebarModule,
    TimeModule,
  ],
  declarations: [AudioTrainingPage, AudioListItemComponent, AudioplayerComponent],
  providers: [
    NativeAudio
  ]
})
export class AudioTrainingPageModule {
}
