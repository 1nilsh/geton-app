import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Audio } from '../../../common/training/model/audio';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss'],
})
export class AudioplayerComponent implements OnInit {

  @Input() audio: Audio;

  constructor(private modalController: ModalController, private nativeAudio: NativeAudio) {
  }

  ngOnInit() {
    this.nativeAudio.preloadSimple(this.audio.audioName, this.audio.audioUrl);
  }

  dismissSelf() {
    this.modalController.dismiss();
  }

  pressPlay() {
    this.nativeAudio.play(this.audio.audioName);
  }

}
