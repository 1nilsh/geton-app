import { Injectable } from '@angular/core';
import { JournalStorageService } from '@app/data/journal/journal-storage.service';
import { JournalEntry } from '@app/data/models/journal-entry';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private journalStorageService: JournalStorageService) {
  }

  public getAllJournalEntriesForTrainingId(trainingId: number): Promise<JournalEntry[]> {
    return this.journalStorageService.loadEntriesFromStorage();
  }

  public async addNewEntry(newEntry: JournalEntry): Promise<void> {
    const entries = await this.journalStorageService.loadEntriesFromStorage();
    entries.unshift(newEntry);
    await this.journalStorageService.saveEntriesToStorage(entries);
  }
}
