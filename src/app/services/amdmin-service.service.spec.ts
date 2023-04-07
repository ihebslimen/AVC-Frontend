import { TestBed } from '@angular/core/testing';

import { AmdminServiceService } from './amdmin-service.service';

describe('AmdminServiceService', () => {
  let service: AmdminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmdminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
