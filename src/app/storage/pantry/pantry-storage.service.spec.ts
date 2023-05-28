import { TestBed } from '@angular/core/testing';

import { PantryStorageService } from './pantry-storage.service';

describe('PantryStorageService', () => {
  let service: PantryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PantryStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
