import { TestBed } from '@angular/core/testing';

import { ResolveResolver } from './resolve.resolver';

describe('ResolveResolver', () => {
  let resolver: ResolveResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResolveResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
