import { TestBed } from '@angular/core/testing';

import { GeoLicationService } from './geo-lication.service';

describe('GeoLicationService', () => {
  let service: GeoLicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoLicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
