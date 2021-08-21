import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-entry-modal',
  templateUrl: './add-entry-modal.component.html',
  styleUrls: ['./add-entry-modal.component.scss'],
})
export class AddEntryModalComponent implements OnInit {

  scaleWohlfuehlen: number;
  scaleWohlwollen: number;
  scaleAchtsamkeit: number;

  enteredText: string;
  helpIsShown = false;

  @ViewChild('content') pageContentElem: any;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismissSelf(): void {
    this.modalController.dismiss();
  }

  handleTextareaChange(event: any): void {
    this.enteredText = event.target.value;
  }

  async handleClickSave(): Promise<void> {
    await this.modalController.dismiss({
      scaleWohlfuehlen: this.scaleWohlfuehlen,
      scaleWohlwollen: this.scaleWohlwollen,
      scaleAchtsamkeit: this.scaleAchtsamkeit,
      enteredText: this.enteredText
    });
  }

  hasEnteredScores() {
    return !!this.scaleWohlfuehlen && !!this.scaleWohlwollen && !!this.scaleAchtsamkeit;
  }

  toggleHelp() {
    this.helpIsShown = !this.helpIsShown;
    this.pageContentElem.scrollToBottom(300);
  }
}
