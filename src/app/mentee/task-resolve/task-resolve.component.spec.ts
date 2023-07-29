import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskResolveComponent } from './task-resolve.component';

describe('TaskResolveComponent', () => {
  let component: TaskResolveComponent;
  let fixture: ComponentFixture<TaskResolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskResolveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskResolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
