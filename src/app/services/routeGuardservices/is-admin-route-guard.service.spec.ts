import { TestBed } from '@angular/core/testing';

import { IsAdminRouteGuardService } from './is-admin-route-guard.service';

describe('IsAdminRouteGuardService', () => {
  let service: IsAdminRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAdminRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
