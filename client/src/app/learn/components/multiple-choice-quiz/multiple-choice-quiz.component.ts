import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MultipleChoice } from '@app/learn/models/quiz.model';
import { LearnService } from '../../services/learn.service';
import { AddLearn } from '@app/learn/actions/learn.actions';
import { Observable } from 'rxjs';
import { Word } from '@app/admin/word/models/word';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@app/learn/reducers';

@Component({
  selector: 'anms-multiple-choice-quiz',
  templateUrl: './multiple-choice-quiz.component.html',
  styleUrls: ['./multiple-choice-quiz.component.scss'],
})
export class MultipleChoiceQuizComponent implements OnInit {
  _data;

  @Input() set data(value: MultipleChoice) {
    const data = {
      title: value.title,
      correctAnswer: value.correctAnswer,
      choices: value.choices,
    };

    this._data = {
      title: data.title,
      correctAnswer: data.correctAnswer,
      choices: data.choices.map(e => ({
        correct: false,
        fail: false,
        answer: e,
      })),
    };
  }

  @Output() answerCorrected = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick(index: number) {
    const answer = this._data.choices[index].answer;
    if (answer === this._data.correctAnswer) {
      this._data.choices[index].correct = true;
      setTimeout(() => {
        this.answerCorrected.emit();
      }, 500);
    } else {
      this._data.choices[index].fail = true;
    }
  }
}
