import { TestBed } from '@angular/core/testing';

import { CanDesactivateGuardService } from './can-desactivate-guard.service';

describe('CanDesactivateGuardService', () => {
  let service: CanDesactivateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanDesactivateGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
