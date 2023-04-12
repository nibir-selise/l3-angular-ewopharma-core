import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorAssignComponent } from './assessor-assign.component';

describe('AssessorAssignComponent', () => {
  let component: AssessorAssignComponent;
  let fixture: ComponentFixture<AssessorAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
