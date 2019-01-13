import { Component, Input, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-learn-card',
  templateUrl: './learn-card.component.html',
  styleUrls: ['./learn-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnCardComponent implements OnInit {

  @Input() data;

  formQuizOne: FormGroup;
  formQuizTwo: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  selectionChange(event) {

  }
}
