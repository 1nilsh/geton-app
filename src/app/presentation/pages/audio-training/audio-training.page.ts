import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AudioplayerComponent } from './audioplayer/audioplayer.component';
import { UserTrainingService } from '../../../applicationlogic/training/services/user-training.service';
import { Training } from '../../../data/models/training';
import { Audio } from '../../../data/models/audio';

@Component({
  selector: 'app-audio-training',
  templateUrl: './audio-training.page.html',
  styleUrls: ['./audio-training.page.scss'],
})
export class AudioTrainingPage implements OnInit {
  selectedTraining: Training;

  constructor(private modalController: ModalController, private trainingService: UserTrainingService) {
    this.trainingService.getSelectedTraining()
      .subscribe(training => {
        if (training.enabledFeatures.audio) {
          this.selectedTraining = training;
        }
      });
  }

  ngOnInit(): void {
  }

  async openPlayer(audio: Audio) {
    const modal = await this.modalController.create({
      component: AudioplayerComponent,
      componentProps: {
        audio,
        image: this.selectedTraining.image,
        trainingName: this.selectedTraining.name
      }
    });
    await modal.present();
  }
}
