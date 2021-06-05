import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-entry-modal',
  templateUrl: './add-entry-modal.component.html',
  styleUrls: ['./add-entry-modal.component.scss'],
})
export class AddEntryModalComponent implements OnInit {

  wellbeingScale: number;
  enteredText: string;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismissSelf(): void {
    this.modalController.dismiss();
  }

  handleRangeChange(event: any): void {
    this.wellbeingScale = event.target.value;
  }

  handleTextareaChange(event: any): void {
    this.enteredText = event.target.value;
  }

  async handleClickSave(): Promise<void> {
    await this.modalController.dismiss({
      wellbeing: this.wellbeingScale,
      enteredText: this.enteredText
    });
  }
}
