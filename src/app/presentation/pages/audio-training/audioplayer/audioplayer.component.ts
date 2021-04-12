import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AudioFeature } from '../../../../data/models/audio-feature';
import { Audio } from '../../../../data/models/audio';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss'],
})
export class AudioplayerComponent implements OnInit {

  @Input() audio: Audio;
  @Input() image: string;
  @Input() trainingName: string;
  @ViewChild('audioElement', { static: false }) audioElement: ElementRef;

  isCurrentlyPlaying: boolean;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismissSelf() {
    this.modalController.dismiss();
  }

  handlePressPlayPauseControl() {
    if (this.isCurrentlyPlaying) {
      this.audioElement.nativeElement.pause();
    } else {
      this.audioElement.nativeElement.play();
    }

    this.isCurrentlyPlaying = !this.isCurrentlyPlaying;
  }
}
