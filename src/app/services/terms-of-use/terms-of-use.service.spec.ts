import { TestBed } from '@angular/core/testing';

import { TermsOfUseService } from './terms-of-use.service';

describe('TermsOfUseService', () => {
  let service: TermsOfUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermsOfUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
