import { TestBed } from '@angular/core/testing';

import { ClockServletService } from './clock-servlet.service';

describe('ClockServletService', () => {
  let service: ClockServletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockServletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
