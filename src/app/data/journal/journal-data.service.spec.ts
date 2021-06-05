import { TestBed } from '@angular/core/testing';

import { JournalDataService } from './journal-data.service';

describe('JournalDataService', () => {
  let service: JournalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
