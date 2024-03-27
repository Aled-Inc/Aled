import { TestBed } from '@angular/core/testing';
import { OpenFoodFactServiceService } from './services/open-food-fact-service.service';
import { RestService } from '@abp/ng.core';

describe('OpenFoodFactServiceService', () => {
  let service: OpenFoodFactServiceService;
  const mockRestService = jasmine.createSpyObj('RestService', ['request']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RestService,
          useValue: mockRestService,
        },
      ],
    });
    service = TestBed.inject(OpenFoodFactServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
