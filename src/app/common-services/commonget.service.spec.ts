import { TestBed } from '@angular/core/testing';

import { CommongetService } from './commonget.service';

describe('CommongetService', () => {
  let service: CommongetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommongetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
