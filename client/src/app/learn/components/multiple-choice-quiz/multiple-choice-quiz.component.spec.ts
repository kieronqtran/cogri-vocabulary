import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceQuizComponent } from './multiple-choice-quiz.component';

describe('MultipleChoiceQuizComponent', () => {
  let component: MultipleChoiceQuizComponent;
  let fixture: ComponentFixture<MultipleChoiceQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
