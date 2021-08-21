import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator-text',
  templateUrl: './indicator-text.component.html',
  styleUrls: ['./indicator-text.component.scss'],
})
export class IndicatorTextComponent implements OnInit {
  @Input() score: number;
  @Input() type: string;

  constructor() {
  }

  ngOnInit() {
  }

  getText(): string {
    const wohlfuehlen = ['überhaupt nicht wohl', 'eher nicht wohl', 'etwas wohl', 'ziemlich wohl', 'ausgesprochen wohl'];
    const wohlwollen = ['überhaupt nicht wohlwollend', 'eher nicht wohlwollend', 'etwas wohlwollend', 'ziemlich wohlwollend', 'ausgesprochen wohlwollend'];
    const achtsamkeit = ['überhaupt nicht achtsam', 'eher nicht achtsam', 'etwas achtsam', 'ziemlich achtsam', 'ausgesprochen achtsam'];

    switch (this.type) {
      case 'wohlfuehlen':
        return wohlfuehlen[this.score - 1];
      case 'wohlwollen':
        return wohlwollen[this.score - 1];
      case 'achtsamkeit':
        return achtsamkeit[this.score - 1];
      default:
        return 'fehler';
    }
  }

}
