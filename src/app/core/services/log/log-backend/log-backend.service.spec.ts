import { TestBed } from '@angular/core/testing';

import { LogBackendService } from './log-backend.service';

describe('LogBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogBackendService = TestBed.get(LogBackendService);
    expect(service).toBeTruthy();
  });
});
