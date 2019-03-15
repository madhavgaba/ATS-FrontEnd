import { TestBed } from '@angular/core/testing';

import { PortalservicesService } from './portalservices.service';

describe('PortalservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortalservicesService = TestBed.get(PortalservicesService);
    expect(service).toBeTruthy();
  });
});
