import { TestBed } from '@angular/core/testing';

import { FlowerpotService } from './flowerpot.service';

describe('FlowerpotService', () => {
  let service: FlowerpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowerpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
