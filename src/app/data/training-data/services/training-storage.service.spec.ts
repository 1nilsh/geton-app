import { TestBed } from '@angular/core/testing';

import { TrainingStorageService } from './training-storage.service';

describe('TrainingStorageService', () => {
  let service: TrainingStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
