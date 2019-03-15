import { TestBed } from '@angular/core/testing';

import { GetcandidatesService } from './getcandidates.service';

describe('GetcandidatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetcandidatesService = TestBed.get(GetcandidatesService);
    expect(service).toBeTruthy();
  });
});
