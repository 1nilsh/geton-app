import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../common/training/service/audio.service';
import { Audio } from '../../common/training/model/audio';
import { ModalController } from '@ionic/angular';
import { AudioplayerComponent } from './audioplayer/audioplayer.component';

@Component({
  selector: 'app-audio-training',
  templateUrl: './audio-training.page.html',
  styleUrls: ['./audio-training.page.scss'],
})
export class AudioTrainingPage implements OnInit {

  audios$ = this.audioService.getAllActiveAudiosForCurrentTraining();

  constructor(private audioService: AudioService, private modalController: ModalController) {
  }

  ngOnInit(): void {
  }

  async openPlayer(audio: Audio) {
    const modal = await this.modalController.create({
      component: AudioplayerComponent,
      componentProps: { audio }
    });
    await modal.present();
  }
}
