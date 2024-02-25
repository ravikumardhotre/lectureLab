import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBatchedToCourseComponent } from './assign-batched-to-course.component';

describe('AssignBatchedToCourseComponent', () => {
  let component: AssignBatchedToCourseComponent;
  let fixture: ComponentFixture<AssignBatchedToCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignBatchedToCourseComponent]
    });
    fixture = TestBed.createComponent(AssignBatchedToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
