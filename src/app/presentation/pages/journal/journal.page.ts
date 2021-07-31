import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEntryModalComponent } from '@app/presentation/pages/journal/add-entry-modal/add-entry-modal.component';
import { JournalEntry } from '@app/data/models/journal-entry';
import { JournalService } from '@app/applicationlogic/journal/journal.service';
import { ReviewEntryModalComponent } from '@app/presentation/pages/journal/review-entry-modal/review-entry-modal.component';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {

  journalEntries: JournalEntry[] = [];
  canAddEntry = true;

  constructor(private modalController: ModalController, private journalService: JournalService) {
  }

  ngOnInit() {
    this.journalService.getAllJournalEntriesForTrainingId(1).then(entries => {
      this.journalEntries = entries;
    });
  }

  async handleClickAddEntry(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddEntryModalComponent,
      cssClass: 'addEntryModal'
    });
    modal.onDidDismiss().then(event => {
      const newEntry = {
        training: 24,
        date: new Date(),
        score: event.data.wellbeing,
        text: event.data.enteredText
      };
      this.journalService.addNewEntry(newEntry);
      this.journalEntries.unshift(newEntry);
    });
    await modal.present();
  }

  async handleClickOnEntry(entry: JournalEntry): Promise<void> {
    const modal = await this.modalController.create({
      component: ReviewEntryModalComponent,
      cssClass: 'reviewEntryModal',
      componentProps: {
        entry
      }
    });
    await modal.present();
  }

  async handleClickDelete(entry: JournalEntry) {
    const i = this.journalEntries.indexOf(entry);
    await this.journalService.deleteEntry(entry);
    this.journalEntries.splice(i, 1);
  }
}
