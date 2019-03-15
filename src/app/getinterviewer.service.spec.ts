import { TestBed } from '@angular/core/testing';

import { GetinterviewerService } from './getinterviewer.service';

describe('GetinterviewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetinterviewerService = TestBed.get(GetinterviewerService);
    expect(service).toBeTruthy();
  });
});
