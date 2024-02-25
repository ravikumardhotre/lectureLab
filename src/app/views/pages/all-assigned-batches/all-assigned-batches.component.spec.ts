import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssignedBatchesComponent } from './all-assigned-batches.component';

describe('AllAssignedBatchesComponent', () => {
  let component: AllAssignedBatchesComponent;
  let fixture: ComponentFixture<AllAssignedBatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAssignedBatchesComponent]
    });
    fixture = TestBed.createComponent(AllAssignedBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
