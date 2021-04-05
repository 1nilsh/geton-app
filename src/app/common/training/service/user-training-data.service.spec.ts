import { TestBed } from '@angular/core/testing';

import { UserTrainingDataService } from './user-training-data.service';

describe('UserTrainingDataService', () => {
  let service: UserTrainingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTrainingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
