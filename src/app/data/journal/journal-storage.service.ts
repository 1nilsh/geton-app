import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core';
import { JournalEntry } from '@app/data/models/journal-entry';

@Injectable({
  providedIn: 'root'
})
export class JournalStorageService {

  private readonly STORAGE_KEY = 'journal_entries';

  constructor() {
  }

  async loadEntriesFromStorage(): Promise<JournalEntry[]> {
    const entries = JSON.parse((await Storage.get({ key: this.STORAGE_KEY })).value) ?? [];
    entries.forEach((item: JournalEntry, index: number, arr: JournalEntry[]) => {
      arr[index].date = new Date(item.date);
    });
    return entries;
  }

  async saveEntriesToStorage(entries: JournalEntry[]): Promise<void> {
    return Storage.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(entries)
    });
  }
}
