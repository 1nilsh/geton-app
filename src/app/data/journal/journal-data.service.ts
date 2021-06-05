import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { JournalEntry } from '@app/data/models/journal-entry';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JournalDataService {

  private url = environment.api_base_url + '/v1/journal';

  constructor(private http: HttpClient) {
  }

  public async updateJournalEntries(journalEntries: JournalEntry[]): Promise<JournalEntry[]> {
    return await this.http.post<JournalEntry[]>(this.url, journalEntries).toPromise();
  }
}
