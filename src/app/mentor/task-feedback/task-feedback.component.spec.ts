import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFeedbackComponent } from './task-feedback.component';

describe('TaskFeedbackComponent', () => {
  let component: TaskFeedbackComponent;
  let fixture: ComponentFixture<TaskFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
