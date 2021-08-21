import { Injectable } from '@angular/core';
import { JournalStorageService } from '@app/data/journal/journal-storage.service';
import { JournalEntry } from '@app/data/models/journal-entry';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private journalStorageService: JournalStorageService) {
  }

  public async getAllJournalEntriesForTrainingId(trainingId: number): Promise<JournalEntry[]> {
    const entries = await this.journalStorageService.loadEntriesFromStorage();
    return entries.filter(e => e.status !== 'deleted');
  }

  public async addNewEntry(newEntry: JournalEntry): Promise<void> {
    const entries = await this.journalStorageService.loadEntriesFromStorage();
    entries.unshift(newEntry);
    await this.journalStorageService.saveEntriesToStorage(entries);
  }

  public async deleteEntry(entry: JournalEntry) {
    const entries = await this.journalStorageService.loadEntriesFromStorage();
    const i = entries.findIndex(e => e.date.valueOf() === entry.date.valueOf());
    console.log('index', i);

    if (entry.id) {
      entries[i].status = 'deleted';
    } else {
      entries.splice(i, 1);
    }

    await this.journalStorageService.saveEntriesToStorage(entries);
  }
}
