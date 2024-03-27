import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OpenFoodFactServiceComponent } from './components/open-food-fact-service.component';
import { OpenFoodFactServiceService } from '@open-food-fact-service';
import { of } from 'rxjs';

describe('OpenFoodFactServiceComponent', () => {
  let component: OpenFoodFactServiceComponent;
  let fixture: ComponentFixture<OpenFoodFactServiceComponent>;
  const mockOpenFoodFactServiceService = jasmine.createSpyObj('OpenFoodFactServiceService', {
    sample: of([]),
  });
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OpenFoodFactServiceComponent],
      providers: [
        {
          provide: OpenFoodFactServiceService,
          useValue: mockOpenFoodFactServiceService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenFoodFactServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
