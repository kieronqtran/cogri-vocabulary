import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  Output,
  EventEmitter,
  AfterContentInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'anms-learn-card',
  templateUrl: './learn-card.component.html',
  styleUrls: ['./learn-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnCardComponent implements OnInit, AfterContentInit {
  @ViewChild(MatHorizontalStepper) currentStepper: MatHorizontalStepper;

  @Input() data;
  @Input() stepper;
  @Input() current;
  @Input() leng;

  @Output() finished = new EventEmitter();

  startTime: Date;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.startTime = new Date();
  }

  selectionChange(event) {}

  switchWord() {
    this.finished.emit(this.startTime);
  }

  nextQuiz() {
    this.currentStepper.next();
  }

}
