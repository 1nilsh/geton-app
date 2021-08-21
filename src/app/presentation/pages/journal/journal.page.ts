import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEntryModalComponent } from '@app/presentation/pages/journal/add-entry-modal/add-entry-modal.component';
import { JournalEntry } from '@app/data/models/journal-entry';
import { JournalService } from '@app/applicationlogic/journal/journal.service';
import { ReviewEntryModalComponent } from '@app/presentation/pages/journal/review-entry-modal/review-entry-modal.component';
import { UserTrainingService } from '@app/applicationlogic/training/services/user-training.service';
import { Training } from '@app/data/models/training';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {

  journalEntries: JournalEntry[] = [];
  canAddEntry = false;
  selectedTrainingId = 0;

  constructor(
    private modalController: ModalController,
    private journalService: JournalService,
    private userTrainingService: UserTrainingService
  ) {
  }

  ngOnInit() {
    this.userTrainingService.getSelectedTraining().subscribe((training: Training) => {
      this.selectedTrainingId = training.id;
      this.journalService.getAllJournalEntriesForTrainingId(training.id).then(entries => {
        this.journalEntries = entries;
        this.canAddEntry = true;
      });
    });
  }

  async handleClickAddEntry(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddEntryModalComponent,
      cssClass: 'addEntryModal'
    });
    modal.onDidDismiss().then(event => {
      if (event.data) {
        const newEntry = {
          training: this.selectedTrainingId,
          date: new Date(),
          scoreWohlfuehlen: event.data.scaleWohlfuehlen,
          scoreWohlwollen: event.data.scaleWohlwollen,
          scoreAchtsamkeit: event.data.scaleAchtsamkeit,
          text: event.data.enteredText
        };
        this.journalService.addNewEntry(newEntry);
        this.journalEntries.unshift(newEntry);
      }
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

  calcAvgScore(entry: JournalEntry): number {
    return Math.round((entry.scoreWohlfuehlen + entry.scoreWohlwollen + entry.scoreAchtsamkeit) / 3);
  }
}
