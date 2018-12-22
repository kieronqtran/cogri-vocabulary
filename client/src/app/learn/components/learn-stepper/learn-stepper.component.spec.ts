import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnStepperComponent } from './learn-stepper.component';

describe('LearnStepperComponent', () => {
  let component: LearnStepperComponent;
  let fixture: ComponentFixture<LearnStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearnStepperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
