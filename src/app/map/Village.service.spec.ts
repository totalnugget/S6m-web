/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VillageService } from './Village.service';

describe('Service: Village', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VillageService]
    });
  });

  it('should ...', inject([VillageService], (service: VillageService) => {
    expect(service).toBeTruthy();
  }));
});
