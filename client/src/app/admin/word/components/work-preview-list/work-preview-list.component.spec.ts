import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPreviewListComponent } from './work-preview-list.component';

describe('WorkPreviewListComponent', () => {
  let component: WorkPreviewListComponent;
  let fixture: ComponentFixture<WorkPreviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkPreviewListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
