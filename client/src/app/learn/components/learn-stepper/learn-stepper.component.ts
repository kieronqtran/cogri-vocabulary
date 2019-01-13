import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '@app/admin/word/models/word';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MultipleChoice } from '@app/learn/models/quiz.model';
import * as _ from 'lodash';
// import clone = require('lodash/cloneDeep');

interface LearningCard {
  card: Word;
  quizzes: MultipleChoice[];
}

@Component({
  selector: 'anms-learn-stepper',
  templateUrl: './learn-stepper.component.html',
  styleUrls: ['./learn-stepper.component.scss'],
})
export class LearnStepperComponent implements OnInit {
  @Input() set words(value: Word[]) {

    const clonedArray = Array.from(value);
    const mapped = clonedArray.map((e, i, a) => {
      const quizzes: LearningCard['quizzes'] = [];
      const choices = Array.from(a);
      choices.splice(i, 1);
      const firstRandom = choices.splice(Math.floor(Math.random() * choices.length), 1)[0];
      const secondRandom = choices.splice(Math.floor(Math.random() * choices.length), 1)[0];
      const thirdRandom = choices.splice(Math.floor(Math.random() * choices.length), 1)[0];
      quizzes.push({
        title: e.word,
        correctAnswer: e.vietnameseMeaning,
        choices: _.shuffle([
          e.vietnameseMeaning,
          firstRandom.vietnameseMeaning,
          secondRandom.vietnameseMeaning,
          thirdRandom.vietnameseMeaning,
        ]),
      });

      quizzes.push({
        title: e.vietnameseMeaning,
        correctAnswer: e.word,
        choices: _.shuffle([
          e.word,
          firstRandom.word,
          secondRandom.word,
          thirdRandom.word,
        ]),
      });

      return {
        card: e,
        quizzes,
      }
    });
    this.quizzes = mapped;
  };
  @Output() selectedChange = new EventEmitter<Word>();
  @Output() doneButton = new EventEmitter<void>();

  quizzes;

  ngOnInit(): void {
  }

  selectionChange(event: StepperSelectionEvent) {
    const word = this.quizzes[event.selectedIndex];
    this.selectedChange.emit(word);
  }

  onClickDone() {
    this.doneButton.emit();
  }

}
