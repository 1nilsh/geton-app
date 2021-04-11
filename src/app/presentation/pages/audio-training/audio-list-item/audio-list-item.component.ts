import { Component, Input, OnInit } from '@angular/core';
import { Audio } from '../../../../data/models/audio';

@Component({
  selector: 'app-audio-list-item',
  templateUrl: './audio-list-item.component.html',
  styleUrls: ['./audio-list-item.component.scss'],
})
export class AudioListItemComponent implements OnInit {

  @Input() audio: Audio;

  constructor() { }

  ngOnInit() {}

}
