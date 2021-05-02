import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEntryModalComponent } from '@app/presentation/pages/journal/add-entry-modal/add-entry-modal.component';
import { JournalEntry } from '@app/data/models/journal-entry';
import { JournalService } from '@app/applicationlogic/journal/journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {

  journalEntries: JournalEntry[] = [];
  canAddEntry = false;

  constructor(private modalController: ModalController, private journalService: JournalService) {
  }

  ngOnInit() {
    this.journalService.getAllJournalEntriesForTrainingId(1).then(entries => {
      this.journalEntries = entries;
      this.canAddEntry = entries.length === 0 ? true : !this.isSameDay(entries[0].date, new Date());
    });
  }

  async handleClickAddEntry(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddEntryModalComponent,
      cssClass: 'addEntryModal'
    });
    modal.onDidDismiss().then(event => {
      const newEntry = {
        date: new Date(),
        score: event.data.wellbeing,
        text: event.data.enteredText
      };
      this.journalService.addNewEntry(newEntry);
      this.journalEntries.unshift(newEntry);
      this.canAddEntry = false;
    });
    await modal.present();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    console.log();
    const dateString1 = date1.toLocaleDateString();
    const dateString2 = date2.toLocaleDateString();

    return dateString1 === dateString2;
  }
}
