import { TestBed } from '@angular/core/testing';

import { PantryStorageService } from './pantry-storage.service';
import { ConfigService } from '../../config/service/config.service';
import { HttpClientModule } from '@angular/common/http';

describe('PantryStorageService', () => {
  let service: PantryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: ConfigService,
          userFactory: () => ({
            get: () => 'https://pantry.es'
          })
        }
      ]
    });
    service = TestBed.inject(PantryStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
