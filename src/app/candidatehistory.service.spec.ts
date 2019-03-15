import { TestBed } from '@angular/core/testing';

import { CandidatehistoryService } from './candidatehistory.service';

describe('CandidatehistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidatehistoryService = TestBed.get(CandidatehistoryService);
    expect(service).toBeTruthy();
  });
});
