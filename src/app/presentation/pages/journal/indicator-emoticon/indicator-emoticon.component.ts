import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator-emoticon',
  templateUrl: './indicator-emoticon.component.html',
  styleUrls: ['./indicator-emoticon.component.scss'],
})
export class IndicatorEmoticonComponent implements OnInit {
  @Input() score: number;
  @Input() size = 'large';

  constructor() { }

  ngOnInit() {}

}
