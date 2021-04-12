import { TestBed } from '@angular/core/testing';

import { AppStateStorageService } from './app-state-storage.service';

describe('AppStateStorageService', () => {
  let service: AppStateStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
