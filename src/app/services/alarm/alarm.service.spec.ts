import { TestBed } from '@angular/core/testing';

import { AlarmService } from './alarm.service';

describe('AlarmService', () => {
  let service: AlarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
