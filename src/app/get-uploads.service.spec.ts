import { TestBed } from '@angular/core/testing';

import { GetUploadsService } from './get-uploads.service';

describe('GetUploadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUploadsService = TestBed.get(GetUploadsService);
    expect(service).toBeTruthy();
  });
});
