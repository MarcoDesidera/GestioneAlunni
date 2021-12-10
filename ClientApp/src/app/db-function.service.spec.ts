import { TestBed } from '@angular/core/testing';

import { DbFunctionService } from './db-function.service';

describe('DbFunctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbFunctionService = TestBed.get(DbFunctionService);
    expect(service).toBeTruthy();
  });
});
