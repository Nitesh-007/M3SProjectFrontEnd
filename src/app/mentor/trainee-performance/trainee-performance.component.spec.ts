import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineePerformanceComponent } from './trainee-performance.component';

describe('TraineePerformanceComponent', () => {
  let component: TraineePerformanceComponent;
  let fixture: ComponentFixture<TraineePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineePerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
