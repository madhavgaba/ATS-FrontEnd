import { TestBed } from '@angular/core/testing';

import { GetjobserviceService } from './getjobservice.service';

describe('GetjobserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetjobserviceService = TestBed.get(GetjobserviceService);
    expect(service).toBeTruthy();
  });
});
