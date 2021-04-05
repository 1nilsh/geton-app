import { Component, Input, OnInit } from '@angular/core';
import { Training } from '../../model/training';

@Component({
  selector: 'app-training-tile',
  templateUrl: './training-tile.component.html',
  styleUrls: ['./training-tile.component.scss'],
})
export class TrainingTileComponent implements OnInit {

  @Input() training: Training;
  @Input() isSelected: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
