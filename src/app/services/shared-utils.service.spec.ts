import { TestBed } from '@angular/core/testing';

import { SharedUtilsService } from './shared-utils.service';

describe('SharedUtilsService', () => {
  let service: SharedUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
