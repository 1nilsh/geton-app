import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonProgressBar, ModalController } from '@ionic/angular';
import { Audio } from '@app/data/models/audio';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss'],
})
export class AudioplayerComponent implements OnInit {

  @Input() audio: Audio;
  @Input() image: string;
  @Input() trainingName: string;

  @ViewChild('progressBar', { static: false }) progressBar: IonProgressBar;
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
  }

  handleProgressBarClick(event: MouseEvent) {
    const clickPositionInPercent = event.offsetX / (event.target as HTMLElement).offsetWidth;
    this.audioElement.nativeElement.currentTime = this.audioElement.nativeElement.duration * clickPositionInPercent;
  }

}
