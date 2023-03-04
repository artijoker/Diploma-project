import { TestBed } from '@angular/core/testing';

import { LogInService } from './log-in.service';

describe('LogInServiceService', () => {
  let service: LogInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
