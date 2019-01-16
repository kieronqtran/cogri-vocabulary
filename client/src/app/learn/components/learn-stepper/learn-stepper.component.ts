import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Word } from '@app/admin/word/models/word';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MultipleChoice } from '@app/learn/models/quiz.model';
import { MatHorizontalStepper } from '@angular/material';
import * as _ from 'lodash';
import * as differenceInSeconds from 'date-fns/difference_in_seconds';
import { NewRecord } from '@app/learn/models/learn.model';

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
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  @Input() set words(value: Word[]) {
    const clonedArray = Array.from(value);
    const mapped = clonedArray.map((e, i, a) => {
      const quizzes: LearningCard['quizzes'] = [];
      const choices = Array.from(a);
      choices.splice(i, 1);
      const firstRandom = choices.splice(
        Math.floor(Math.random() * choices.length),
        1,
      )[0];
      const secondRandom = choices.splice(
        Math.floor(Math.random() * choices.length),
        1,
      )[0];
      const thirdRandom = choices.splice(
        Math.floor(Math.random() * choices.length),
        1,
      )[0];

      quizzes.push({
        wordId: e.id,
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
        wordId: e.id,
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
      };
    });
    this.quizzes = mapped;
  }
  @Output() selectedChange = new EventEmitter<Word>();
  @Output() doneButton = new EventEmitter<void>();

  quizzes;

  lastLearnedWord;
  ngOnInit(): void {}

  selectionChange(event: StepperSelectionEvent) {
    this.selectedChange.emit(this.lastLearnedWord);
  }

  onLearnFinished(index: number, timeStart: Date) {
    if (index < this.quizzes.length - 1 ) {
      const timeEnd = new Date();
      const record = {
        wordId: this.quizzes[index].card.id as number,
        timeStart,
        timeEnd,
        totalTime: differenceInSeconds(timeEnd, timeStart),
      }
      this.lastLearnedWord = record;
      this.stepper.next();
    } else {
      this.doneButton.emit();
    }
  }
}
