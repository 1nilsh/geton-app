import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JournalEntry } from '@app/data/models/journal-entry';

@Component({
  selector: 'app-review-entry-modal',
  templateUrl: './review-entry-modal.component.html',
  styleUrls: ['./review-entry-modal.component.scss'],
})
export class ReviewEntryModalComponent implements OnInit {
  @Input() entry: JournalEntry;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismissSelf(): void {
    this.modalController.dismiss();
  }

}
