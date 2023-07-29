import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteesListComponent } from './mentees-list.component';

describe('MenteesListComponent', () => {
  let component: MenteesListComponent;
  let fixture: ComponentFixture<MenteesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenteesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
