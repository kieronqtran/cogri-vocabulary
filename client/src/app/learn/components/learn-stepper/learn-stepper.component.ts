import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '@app/admin/word/models/word';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'anms-learn-stepper',
  templateUrl: './learn-stepper.component.html',
  styleUrls: ['./learn-stepper.component.scss'],
})
export class LearnStepperComponent {
  @Input() words: Word[];
  @Output() selectedChange = new EventEmitter<Word>();
  @Output() doneButton = new EventEmitter<void>();

  selectionChange(event: StepperSelectionEvent) {
    const word = this.words[event.selectedIndex];
    this.selectedChange.emit(word);
  }

  onClickDone() {
    this.doneButton.emit();
  }
}
