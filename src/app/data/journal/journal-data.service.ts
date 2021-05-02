import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { JournalEntry } from '@app/data/models/journal-entry';

@Injectable({
  providedIn: 'root'
})
export class JournalDataService {

  private url = environment.api_base_url + '/v1/journal';

  constructor() {
  }

  public fetchAllJournalEntries(): JournalEntry[] {
    return [];
  }

  public postJournalUpdates(): void {
  }
}
