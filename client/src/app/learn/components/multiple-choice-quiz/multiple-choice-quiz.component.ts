import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MultipleChoice } from '@app/learn/models/quiz.model';

@Component({
  selector: 'anms-multiple-choice-quiz',
  templateUrl: './multiple-choice-quiz.component.html',
  styleUrls: ['./multiple-choice-quiz.component.scss']
})
export class MultipleChoiceQuizComponent implements OnInit {

  _data;

  @Input() set data(value: MultipleChoice) {
    const data = {
      'title': 'earum',
      'correctAnswer': 'Ut ea ea quas nam excepturi.',
      'choices': [
        'Ut ea ea quas nam excepturi.',
        'Ut alias et deserunt eos voluptas maiores.',
        'Sequi cum provident non.',
        'Quaerat ipsam delectus quasi reiciendis quia sequi maiores et.'
      ]
    };
    this._data = {
      title: data.title,
      correctAnswer: data.correctAnswer,
      choices: data.choices.map(e => ({
        correct: false,
        fail: false,
        answer: e
      }))
    }
  };

  @Output() answer = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(index: number) {
    const answer = this._data.choices[index].answer;
    if (answer === this._data.correctAnswer) {
      this._data.choices[index].correct = true;
    } else {
      this._data.choices[index].fail = true;
    }
    this.answer.emit(answer);
  }

}
